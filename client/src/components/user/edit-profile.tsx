import axios from "axios";
import React, { Component, FormEvent } from "react";
import { User } from "../../Models/User";
import { ModalMode } from "../../Models/ModalMode";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import GenericModal from "../generic-utils/modal";
import GenericNavBtn from "../generic-utils/nav-btn";
import './edit-profile.css';

interface EditProfileState {
    username: string,
    firstName: string,
    lastName: string,
    validatePassword: string,

    displayModal: boolean,
    modalType: string,
    successModalMode: ModalMode
}

export default class EditProfile extends Component<any, EditProfileState> {

    constructor(props: any) {
        super(props);

        this.state = {
            username: '', firstName: '', lastName: '', validatePassword: '',
            displayModal: false, modalType: '', successModalMode: null
        }
    };

    componentDidMount() {
        store.getState().loggedIn
            ? this.getUserDetails()
            : this.props.history.push('/home');
    }

    private getUserDetails = async () => {
        try {
            let response = await axios.get("http://localhost:3001/users");
            let user = response.data[0];

            this.setState({
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
            });

        } catch (err) {
            alert(err.message);
            console.log(err);
        }
    };

    private editProfile = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            let userDetails = new User(this.state.username, this.state.validatePassword, this.state.firstName, this.state.lastName);
            await axios.put("http://localhost:3001/users/", userDetails);
            this.setState({ successModalMode: ModalMode.SAVED })
            this.handleSuccessModal();

        } catch (err) {
            alert(err.response.data.error);
            console.log(err);
        }
    };

    private handleSuccessModal = () => {
        this.setState({ displayModal: true, modalType: 'success' });

        setTimeout(() => {
            this.setState({ displayModal: false });
            this.props.history.push('/home');
        }, 2000)
    }

    private deleteAccount = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        try {
            await axios.delete("http://localhost:3001/users");

            this.setState({ displayModal: false, successModalMode: ModalMode.DELETED });
            this.handleSuccessModal();
            this.logout();

        } catch (err) {
            alert(err.response.data.error);
            console.log(err);
        }
    }

    private logout = () => {
        sessionStorage.clear();
        sessionStorage.setItem('landing', 'done');
        store.dispatch({ type: ActionType.Logout });

        let socket = store.getState().socket;
        socket.disconnect();
    }

    public render() {
        let dangerMsg = 'Are you sure you want to delete your account?';
        let successMsg = this.state.successModalMode === ModalMode.SAVED ? "Details changed successfully!" : "Account deleted.";

        return (
            <div className="edit-profile">

                <GenericNavBtn page="home" displayText="Back Home"/>

                {this.state.displayModal &&
                    <GenericModal
                        msg={this.state.modalType === 'success' ? successMsg : dangerMsg}
                        type={this.state.modalType}
                        onSubmit={() => this.setState({ displayModal: false })}
                        onDelete={this.deleteAccount}
                    />
                }

                {/* EDIT PROFILE FORM */}
                <form onSubmit={this.editProfile} className="backdrop-form" >
                    <h2>Edit Profile</h2>


                    <input className="disabled" type="text" placeholder="Username" defaultValue={this.state.username}
                        onClick={() => alert("Username is not changeable")} />
                        
                    <input autoFocus type="text" placeholder="First Name" defaultValue={this.state.firstName}
                        onChange={e => this.setState({ firstName: e.target.value })} />
                    <input type="text" placeholder="Last Name" defaultValue={this.state.lastName}
                        onChange={e => this.setState({ lastName: e.target.value })} />

                    <br />
                    <label> Insert your current password to apply changes </label>
                    <input type="password" placeholder="Current Password"
                        onChange={e => this.setState({ validatePassword: e.target.value })} />


                    <div className="btns">
                        <input className="submit-btn" type="submit" value="Save Changes" />
                        <input className="delete-btn" type="button" value="Delete Account"
                            onClick={() => this.setState({ displayModal: true, modalType: 'danger' })} />
                    </div>

                </form>

            </div>
        );
    }
}
