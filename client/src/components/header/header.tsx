import React, { Component } from "react";
import { Link } from "react-router-dom";
import { ActionType } from "../../redux/action-type";
import { store } from "../../redux/store";
import './header.css';

interface HeaderState {
  loggedIn: boolean
}

export default class Header extends Component<any, HeaderState> {

  public constructor(props: any) {
    super(props);
    this.state = { loggedIn: false }
  }

  componentDidMount() {
    store.subscribe(() =>
      this.setState({
        loggedIn: store.getState().loggedIn
      }));
  }

  private logout = () => {
    sessionStorage.clear();
    store.dispatch({ type: ActionType.Logout });

    let socket = store.getState().socket;
    socket && socket.disconnect();

    // the line below is for cancelling landing animation
    sessionStorage.setItem('landing', 'done');
  }

  public render() {
    let userAlias;
    let callToAction;
    let landing = sessionStorage.getItem('landing') ? '' : 'landing';

    if (this.state.loggedIn) {
      userAlias = sessionStorage.getItem("userAlias");
      callToAction = <Link className="log-in-out" to="/home" onClick={this.logout}>Log out</Link>;

    } else {
      userAlias = "stranger";
      callToAction =
        <h6 className="log-in-out"
          onClick={() => store.dispatch({ type: ActionType.ShowLoginModal, payload: true })}>
          Login / Register
        </h6>;
    }

    return (
      <div className="header">

        <h6>Hello, {userAlias}!</h6>
        {callToAction}

        {landing && <h1 className="welcome">Welcome!</h1>}
        <h1 className={landing}>Obser Vacation</h1>
      </div>
    );
  }
}
