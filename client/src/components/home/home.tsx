import axios from "axios";
import React, { Component, FormEvent } from "react";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import { Unsubscribe } from "redux";
import { User } from "../../Models/User";
import { SuccessfulLoginServerResponse } from "../../Models/SuccessfulLoginServerResponse";
import { Vacation } from "../../Models/Vacation";
import VacationCard from "../vacation-card/vacation-card";
import { io } from 'socket.io-client';
import GenericNavBtn from "../generic-utils/nav-btn";
import "./home.css";

interface HomeState {
  vacations: Vacation[];

  onRegisterMode: boolean;
  loggedIn: boolean;
  showLoginModal: boolean;

  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

export default class Home extends Component<any, HomeState> {
  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);

    this.state = {
      vacations: [],
      onRegisterMode: false, loggedIn: false, showLoginModal: true,
      username: "", password: "", firstName: "", lastName: ""
    };
  }


  componentDidMount() {
    this.unsubscribeStore = store.subscribe(() =>
      this.setState({
        vacations: store.getState().vacations,
        loggedIn: store.getState().loggedIn,
        showLoginModal: store.getState().showLoginModal,
      }));

    this.checkIfLoggedInOnSession();
  }

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  private checkIfLoggedInOnSession = () => {
    // First, check if there's a list already in store (when switching components)
    if (store.getState().vacations.length !== 0) {
      this.setState({ vacations: store.getState().vacations });
      return;
    }

    // If not - get all from DB
    this.getAllVacations();

    // And RECONNECT if there's a token on session storage (page was refreshed while logged in)
    if (sessionStorage.getItem("token")) {
      store.dispatch({ type: ActionType.Login });
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token");

      this.connectToSocket();
      this.getUsersFollowing();
    }
  }

  private getAllVacations = async () => {
    try {
      const response = await axios.get<Vacation[]>("http://localhost:3001/vacations");
      let allVacations = response.data;
      store.dispatch({ type: ActionType.GetVacationsList, payload: allVacations });

    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  }

  private getUsersFollowing = async () => {
    try {
      const response = await axios.get<[]>("http://localhost:3001/vacations/followed");
      let followedVacations = response.data;

      // Create an array of the following vacations id's
      let followedIds: number[] = [];
      followedVacations.map((followed: { vacationId: number; }) => followedIds.push(followed.vacationId));

      // Update list accordingly
      let customVacationsList = [...this.state.vacations];
      customVacationsList.map(vacation => followedIds.includes(vacation.id) && (vacation.isFollowed = 1));
      store.dispatch({ type: ActionType.GetVacationsList, payload: customVacationsList });

    } catch (err) {
      alert(err.message);
      console.log(err);
    }
  }


  //  FUNCTIONALITIES
  private register = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let newUserDetails = new User(this.state.username, this.state.password, this.state.firstName, this.state.lastName);
      await axios.post("http://localhost:3001/users", newUserDetails);
      this.login(e);

    } catch (err) {
      alert(err.response.data.error);
      console.log(err);
    }
  };

  private login = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      let userLoginDetails = new User(this.state.username, this.state.password);
      const response = await axios.post<SuccessfulLoginServerResponse>("http://localhost:3001/users/login", userLoginDetails);
      const serverResponse = response.data;
      const token = axios.defaults.headers.common['Authorization'] = "Bearer " + serverResponse.token;
      sessionStorage.setItem("token", token);

      this.closeLoginModal();
      store.dispatch({ type: ActionType.Login });
      this.handleUserType(serverResponse.userType);
      this.connectToSocket();

      // the line below is for cancelling the landing animation
      sessionStorage.setItem('landing', 'done');

    } catch (err) {
      alert(err.response.data.error);
      console.log(err);
    }
  };

  private handleUserType = (userType: string) => {
    sessionStorage.setItem("userType", userType);

    if (userType === "ADMIN") {
      sessionStorage.setItem("userAlias", "admin");
      this.props.history.push("/admin");

    } else {
      sessionStorage.setItem("userAlias", this.state.username);
      this.getUsersFollowing();
    }
  }

  private closeLoginModal = () => {
    // Reset modes
    this.state.onRegisterMode && this.setState({ onRegisterMode: false });
    store.getState().guestTryToFollow && store.dispatch({ type: ActionType.GuestTryToFollowVacation, payload: false });
    // Close
    store.dispatch({ type: ActionType.ShowLoginModal, payload: false });
    // Remove css landing animation 
    sessionStorage.setItem('landing', 'done');
  }


  // SOCKET
  private connectToSocket = () => {
    let socket = io('http://localhost:3002/', { query: "token=" + sessionStorage.getItem("token") }).connect();
    store.dispatch({ type: ActionType.SetSocket, payload: socket })

    socket.on("DELETE_VACATION", (vacationId: number) => {
      store.dispatch({ type: ActionType.DeleteVacation, payload: vacationId });
    });

    socket.on("ADD_VACATION", (newVacation: Vacation) => {
      store.dispatch({ type: ActionType.AddNewVacation, payload: newVacation });
    });

    socket.on("EDIT_VACATION", (editedVacation: Vacation) => {
      store.dispatch({ type: ActionType.EditVacation, payload: editedVacation });
    });
  }

  public render() {

    let loggedIn = store.getState().loggedIn;
    let vacationsList = store.getState().vacations;
    let showLoginModal = store.getState().showLoginModal;
    let onRegisterMode = this.state.onRegisterMode;
    let isLanding = sessionStorage.getItem('landing') ? '' : 'landing';

    loggedIn
      ? vacationsList.sort((a, b) => a.isFollowed === b.isFollowed ? 0 : a.isFollowed ? -1 : 1)
      : vacationsList.map(vacation => vacation.isFollowed && (vacation.isFollowed = 0));


    return (
      <div className="home">

        {loggedIn &&
          <GenericNavBtn page="user/editProfile" displayText="Edit Profile" />}

        {vacationsList.map(vacation =>
          <VacationCard key={vacation.id} vacation={vacation} />)}


        {/* LOGIN-REGISTER MODAL */}
        {(!loggedIn && showLoginModal)
          &&
          <div className={`modal ${isLanding}`}>
            <div className={`modal-content ${isLanding}`}>

              <div className="modal-header">
                <span className="close" onClick={this.closeLoginModal}> &times; </span>
                {store.getState().guestTryToFollow && <h6 className="modal-warning">Only members are able to follow vacations</h6>}
                <h2>{onRegisterMode ? 'Register' : 'Login'}</h2>
              </div>

              <div className="modal-body">
                <form onSubmit={onRegisterMode ? this.register : this.login} >
                  <span>*</span>
                  <input type="text" placeholder="Username" onChange={e => this.setState({ username: e.target.value })} required />
                  <span>*</span>
                  <input type="password" placeholder="Password" onChange={e => this.setState({ password: e.target.value })} required />

                  {onRegisterMode &&
                    <div>
                      <input type="text" placeholder="First Name" onChange={e => this.setState({ firstName: e.target.value })} />
                      <input type="text" placeholder="Last Name" onChange={e => this.setState({ lastName: e.target.value })} />
                    </div>}

                  <div className="btns">
                    <input className="submit-btn" type="submit"
                      value={onRegisterMode ? "Register" : "Login"} />
                    <input className="switch-mode-btn" type="button"
                      value={onRegisterMode ? "Already a member?" : "Not a member yet?"}
                      onClick={() => this.setState({ onRegisterMode: !onRegisterMode })} />
                  </div>

                </form>
              </div>

            </div>
          </div>
        }
      </div>
    );
  }
}
