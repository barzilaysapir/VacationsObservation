import axios from "axios";
import React, { Component } from "react";
import { Bar } from 'react-chartjs-2';
import { FollowedVacation } from "../../Models/FollowedVacations";
import { store } from "../../redux/store";
import GenericNavBtn from "../generic-utils/nav-btn";

interface ChartState {
    followedVacations: FollowedVacation[],
    labels: string[],
    datasets: any[],
}

export default class Chart extends Component<any, ChartState> {
    constructor(props: any) {
        super(props);

        this.state = {
            followedVacations: [],
            labels: [],
            datasets: [{
                label: 'Followed Vacations',
                backgroundColor: 'rgba(102, 51, 153, 0.5)',
                borderColor: 'rgba(0, 0, 0, 0.5)',
                hoverBorderWidth: 1,
                data: [],
            }],
        }
    }

    componentDidMount() {
        this.validateAdminIsLoggedIn();
        this.getChartDataFromServer();
    }

    private validateAdminIsLoggedIn = () => {
        if (!store.getState().loggedIn || sessionStorage.getItem("userType") !== "ADMIN") {
            this.props.history.push("/home");
        }
    }

    private getChartDataFromServer = async () => {
        try {
            const response = await axios.get<FollowedVacation[]>("http://localhost:3001/vacations/chart");
            let chartData = response.data;
            this.setState({ followedVacations: chartData })
            this.setChartData();

        } catch (err) {
            alert(err.message);
            console.log(err);
        }
    }

    private setChartData = () => {
        let datasets = this.state.datasets;
        datasets[0].data = this.state.followedVacations.map((vacation: any) => vacation.amountOfFollowers);
        let labels = this.state.followedVacations.map((vacation: any) => "Vacation " + vacation.id);

        this.setState({ labels, datasets })
    }



    public render() {

        return (
            <div className="bar-chart">

                <GenericNavBtn page="admin" displayText="Back Home" />

                <div className="backdrop-form">
                    <Bar
                        data={this.state}
                        height={370}
                        width={1000}
                        options={{
                            title: {
                                display: true,
                                text: 'Followed Vacations',
                                fontSize: 30,
                                fontFamily: 'Baumans'
                            },
                            legend: {
                                display: false
                            },
                            scales: {
                                xAxes: [{
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Vacation ID",
                                        fontSize: 18,
                                        fontFamily: 'Baumans',
                                    },
                                }],
                                yAxes: [{
                                    ticks: {
                                        beginAtZero: true,
                                        stepSize: 1
                                    },
                                    scaleLabel: {
                                        display: true,
                                        labelString: "Amount Of Followers",
                                        fontSize: 18,
                                        fontFamily: 'Baumans'
                                    },

                                }]
                            }
                        }} />
                </div>
            </div>
        );
    }
}
