import axios from "axios";
import React, { Component } from "react";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";
import Star from "../../icons/star.png";
import Edit from "../../icons/edit-pencil.png";
import Delete from "../../icons/delete.png";
import './vacation-card.css';
import { Link } from "react-router-dom";
import { Vacation } from "../../Models/Vacation";
import GenericModal from "../generic-utils/modal";

interface CardProps {
    vacation: Vacation
}

interface CardState {
    displayModal: boolean
}

export default class Card extends Component<CardProps, CardState> {

    public constructor(props: CardProps) {
        super(props);
        this.state = { displayModal: false }
    }

    private deleteVacation = async () => {
        try {
            let id = this.props.vacation.id;
            await axios.delete("http://localhost:3001/vacations/" + id);
            store.dispatch({ type: ActionType.DeleteVacation, payload: id });

        } catch (err) {
            alert(err.response.data.error);
            console.log(err);
        }
    };

    private onEditClicked = () => {
        let vacation = this.props.vacation;
        store.dispatch({ type: ActionType.GetVacationDetails, payload: vacation });
        store.dispatch({ type: ActionType.EditingVacation });
    }

    // FOLLOW CASES
    private onCardClicked = () => {
        if (sessionStorage.getItem("userType") === "ADMIN") {
            return;
        }

        if (sessionStorage.getItem("userType") === "CUSTOMER") {
            let vacation = this.props.vacation;
            // Toggle follow on DB
            vacation.isFollowed
                ? this.unfollowVacation(vacation.id)
                : this.followVacation(vacation.id);

        } else {
            // Show login modal with warning for guests
            store.dispatch({ type: ActionType.ShowLoginModal, payload: true });
            store.dispatch({ type: ActionType.GuestTryToFollowVacation, payload: true });
        }
    }

    private followVacation = async (vacationId: number) => {
        try {
            await axios.post("http://localhost:3001/vacations/followed", { vacationId });
            this.updateUI();

        } catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    private unfollowVacation = async (vacationId: number) => {
        try {
            await axios.delete("http://localhost:3001/vacations/followed/" + vacationId);
            this.updateUI();

        } catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    private updateUI = () => {
        let vacations = [...store.getState().vacations];

        vacations.forEach(vacation => {
            if (vacation.id === this.props.vacation.id) {

                if (vacation.isFollowed) {
                    vacation.isFollowed -= 1;
                    vacation.amountOfFollowers -= 1;

                } else {
                    vacation.isFollowed += 1;
                    vacation.amountOfFollowers += 1;
                }
            }
        });

        store.dispatch({ type: ActionType.GetVacationsList, payload: vacations });
    }


    public render() {

        let adminLoggedIn = sessionStorage.getItem("userType") === "ADMIN";
        let customerLoggedIn = sessionStorage.getItem("userType") === "CUSTOMER";

        let landing = sessionStorage.getItem('landing') ? '' : 'landing';
        let isFollowed = this.props.vacation.isFollowed ? "followed" : "";

        let amountOfFollowers = this.props.vacation.amountOfFollowers !== 0 ? this.props.vacation.amountOfFollowers : "";

        return (
            <div className={`vacations ${isFollowed} ${landing}`}
                style={{ backgroundImage: `url(${this.props.vacation.imageUrl})` }}
                onClick={this.onCardClicked} >

                <h1>{this.props.vacation.destination}</h1>
                <h5>{new Date(this.props.vacation.startDate).toISOString().split('T')[0]} - {new Date(this.props.vacation.startDate).toISOString().split('T')[0]}</h5>
                <h2>{this.props.vacation.price} $</h2>
                <p className="description">{this.props.vacation.description}</p>

                {adminLoggedIn
                    ?
                    <div>
                        <Link to="/admin/manageVacation">
                            <img className="edit" src={Edit} alt="edit" onClick={this.onEditClicked} />
                        </Link>

                        <img className="delete" src={Delete} alt="delete" onClick={() => this.setState({ displayModal: true })} />
                    </div>
                    :
                    // Customers & guests
                    <div>
                        <img className="follow" src={Star} alt="follow" />
                        {customerLoggedIn && <label> <br />{amountOfFollowers}</label>}
                    </div>}

                {this.state.displayModal &&

                    <GenericModal
                        msg="Are you sure you want to delete this vacation?"
                        type="danger"
                        onSubmit={() => this.setState({ displayModal: false })}
                        onDelete={this.deleteVacation}
                    />}
            </div>
        );
    }
}
