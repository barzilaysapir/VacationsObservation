import axios from "axios";
import React, { FormEvent } from "react";
import { Component } from "react";
import { ModalMode } from "../../Models/ModalMode";
import { Vacation } from "../../Models/Vacation";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";
import GenericModal from "../generic-utils/modal";
import GenericNavBtn from "../generic-utils/nav-btn";

interface ManageVacationState {
    id: number,
    destination: string,
    description: string,
    imageUrl: string,
    price: number,
    startDate: Date,
    endDate: Date,
    displaySuccessModal: boolean,
    mode: ModalMode
}

export default class ManageVacation extends Component<any, ManageVacationState> {
    private mode = store.getState().movedToEdit ? ModalMode.EDIT : ModalMode.ADD;

    public constructor(props: any) {
        super(props);

        this.state = {
            id: null,
            destination: "",
            imageUrl: "",
            description: "",
            price: 0,
            startDate: new Date(),
            endDate: new Date(),
            displaySuccessModal: false,
            mode: this.mode
        }
    }

    componentDidMount() {
        // Validate admin is logged in
        !store.getState().loggedIn && this.props.history.push("/admin");

        // If edit vacation - get it's details
        this.state.mode === ModalMode.EDIT && this.getVacationDetails();
    }

    private getVacationDetails = () => {
        let vacation = store.getState().vacationDetails;

        this.setState({
            id: vacation.id,
            destination: vacation.destination,
            imageUrl: vacation.imageUrl,
            description: vacation.description,
            price: vacation.price,
            startDate: vacation.startDate,
            endDate: vacation.endDate,
        });
    };

    private editVacation = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            let vacationDetails = new Vacation(this.state.id,
                this.state.destination, this.state.imageUrl, this.state.description, this.state.price,
                this.state.startDate, this.state.endDate);

            await axios.put("http://localhost:3001/vacations/", vacationDetails);
            store.dispatch({ type: ActionType.EditVacation, payload: vacationDetails });
            this.onSubmitSuccess();

        } catch (err) {
            alert(err.response.data.error);
            console.log(err);
        }
    };

    private addVacation = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (this.state.price === 0) {
            alert("Vacation's price cannot be free!")
            return;
        }

        // Defined an id for the new vacation
        let allVacations = store.getState().vacations;
        let id = allVacations[allVacations.length - 1].id + 1;

        try {
            let newVacationDetails = new Vacation(id, this.state.destination, this.state.imageUrl,
                this.state.description, this.state.price, this.state.startDate, this.state.endDate);

            await axios.post("http://localhost:3001/vacations/", newVacationDetails);
            store.dispatch({ type: ActionType.AddNewVacation, payload: newVacationDetails });
            this.onSubmitSuccess();

        } catch (err) {
            alert(err.response.data.error);
            console.log(err);
        }
    };

    private onSubmitSuccess = () => {
        this.setState({ displaySuccessModal: true });

        setTimeout(() => {
            this.setState({ displaySuccessModal: false });
            this.resetInputs();

            if (this.state.mode === ModalMode.EDIT) {
                store.dispatch({ type: ActionType.ClearEditVacationForm });
                this.props.history.push('/admin');
            }
        }, 2000)
    }

    private resetInputs() {
        this.setState({
            destination: "",
            imageUrl: "",
            description: "",
            price: 0,
            startDate: null,
            endDate: null
        });
    };


    public render() {
        const MODE = this.state.mode;

        return (
            <div className="manage-vacations">

                <GenericNavBtn
                    page="admin"
                    displayText="Back Home"
                    function={() => store.dispatch({ type: ActionType.ClearEditVacationForm })}
                />

                {this.state.displaySuccessModal &&
                    <GenericModal
                        msg={`Vacation ${MODE === ModalMode.EDIT ? 'changed' : 'added'}!`}
                        type='success' />
                }


                {/* MANAGE VACATION FORM */}
                <form onSubmit={MODE === ModalMode.EDIT ? this.editVacation : this.addVacation} className="backdrop-form" >
                    <h2>{MODE} Vacation</h2>


                    <input autoFocus type="text" placeholder="Destination" value={this.state.destination} maxLength={60}
                        onChange={e => this.setState({ destination: e.target.value })} required />
                    <input type="text" placeholder="Image Url" value={this.state.imageUrl} maxLength={300}
                        onChange={e => this.setState({ imageUrl: e.target.value })} required />
                    <input type="text" placeholder="Description" value={this.state.description} maxLength={100}
                        onChange={e => this.setState({ description: e.target.value })} required />
                    <input type="number" placeholder="Price" value={this.state.price}
                        onChange={e => this.setState({ price: +e.target.value })} required />

                    <input type="date" placeholder="Start Date" className="start-date"
                        value={new Date(this.state.startDate).toISOString().split('T')[0]}
                        min={new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().split("T")[0]}
                        onChange={e => this.setState({ startDate: new Date(e.target.value) })} required />

                    <input type="date" placeholder="End Date" className="end-date"
                        value={new Date(this.state.endDate).toISOString().split('T')[0]}
                        min={new Date(this.state.startDate).toISOString().split("T")[0]}
                        onChange={e => this.setState({ endDate: new Date(e.target.value) })} required />


                    <div className="btns">
                        <input className="submit-btn" type="submit" value={MODE === ModalMode.EDIT ? "Save" : "Add"} />
                    </div>

                </form>

            </div>
        );
    }
}
