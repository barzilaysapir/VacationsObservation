import axios from "axios";
import { Component } from "react";
import { Link } from "react-router-dom";
import { Unsubscribe } from "redux";
import { store } from "../../redux/store";
import { ActionType } from "../../redux/action-type";
import { Vacation } from "../../Models/Vacation";
import Chart from "../../icons/chart.png";
import VacationCard from "../vacation-card/vacation-card";
import GenericNavBtn from "../generic-utils/nav-btn";
import "./admin.css";

interface AdminState {
  vacations: Vacation[]
}

export default class Admin extends Component<any, AdminState> {
  private unsubscribeStore: Unsubscribe;

  constructor(props: any) {
    super(props);
    this.state = { vacations: [] }
  }

  componentDidMount() {
    this.validateAdminLoggedIn();

    this.unsubscribeStore = store.subscribe(() => this.setState({
      vacations: store.getState().vacations
    }));

    // Get list from store, else if it's empty (page was refreshed) - than get it from DB
    store.getState().vacations.length !== 0
      ? this.setState({ vacations: store.getState().vacations })
      : this.getVacationsFromServer();
  };

  componentWillUnmount() {
    this.unsubscribeStore();
  }

  private validateAdminLoggedIn = () => {
    if (sessionStorage.getItem("userType") !== "ADMIN") {
      this.props.history.push("/home");
    }
    else if (!store.getState().loggedIn && !sessionStorage.getItem("token")) {
      this.props.history.push("/admin");
    }
    else {
      store.dispatch({ type: ActionType.Login });
      axios.defaults.headers.common['Authorization'] = sessionStorage.getItem("token");
    }
  }

  private getVacationsFromServer = async () => {
    try {
      const response = await axios.get<Vacation[]>("http://localhost:3001/vacations");
      let vacations = response.data;
      store.dispatch({ type: ActionType.GetVacationsList, payload: vacations });

    } catch (err) {
      alert(err.response.data.error);
      console.log(err);
    }
  }


  public render() {
    return (
      <div className="admin">

        <GenericNavBtn page="admin/manageVacation" displayText="Add Vacation" />

        <Link to="/admin/chart"> <img className="chart" src={Chart} alt="chart-icon" /> </Link>

        {this.state.vacations.map(vacation =>
          <VacationCard key={vacation.id} vacation={vacation} />)}

      </div>
    );
  }
}
