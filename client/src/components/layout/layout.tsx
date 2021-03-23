import { Component } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Home from "../home/home";
import Header from "../header/header";
import Admin from "../admin/admin";
import Chart from "../admin/chart";
import ManageVacation from "../admin/manage-vacation";
import EditProfile from "../user/edit-profile";
import "./layout.css";

export default class Layout extends Component {

  public render() {

    return (
      <div className="layout">
        <BrowserRouter>

          <header>
            <Header />
          </header>

          <main>
            <Switch>
              <Route path="/home" component={Home} exact />
              <Route path="/admin" component={Admin} exact />
              <Route path="/admin/chart" component={Chart} exact />
              <Route path="/admin/manageVacation" component={ManageVacation} exact />
              <Route path="/user/editProfile" component={EditProfile} exact />
              <Redirect from="/" to="/home" exact />
            </Switch>
          </main>

        </BrowserRouter>
      </div>
    );
  }
}
