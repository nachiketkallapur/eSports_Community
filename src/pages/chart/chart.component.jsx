import React from 'react'
import { Line, Doughnut, Bar } from 'react-chartjs-2';
import { firestore } from '../../firebase/firebase.utils';
import firebase from '../../firebase/firebase.utils'

import './chart.styles.css';


class Chart extends React.Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem("currentUser")) {
            alert("Login to use charts");
            props.history.push("/login");
        }

        this.state = {
            playerData: null,
            playerFetch: false,
            clanData: null,
            clanFetch: false,
            companyData: null,
            companyFetch: false,
            gameData: null,
            gameFetch: false,
            eventData: null,
            eventFetch: false,
            error: false,
            message: '',
            username: localStorage.getItem("currentUser"),
        }
    }


    componentDidMount() {
        if (!localStorage.getItem("currentUser")) return;
        //fetch Player Data
        fetch("http://localhost:8080/player/fetch/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                all: true,
            }),
        })
            .then((res) => res.json())
            .then(({ error, data, message }) => {
                // console.log("PYD: ",data);
                if (error === true) {
                    alert(message);
                    this.setState({ error: true, message })
                }
                else if (data.length === 0) {
                    alert(message);
                    this.props.history.push("/login");
                    return;
                    // this.setState({ error: true, message, userType, username, playerData: {} });
                } else {
                    this.setState({ error: false, playerData: data, message, playerFetch: true });
                }
            })
            .catch((error) => {
                alert(error.message);
                this.setState({ error: true, message: error.message });
            });

        //fetch game data
        fetch("http://localhost:8080/game/fetch/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                all: true,
            }),
        })
            .then((res) => res.json())
            .then(({ error, message, data }) => {
                if (error === true) {
                    alert(message);
                    this.setState({ error: true, message, gameData: [] });
                } else if (data.length === 0) {
                    alert(message);
                    this.setState({ error: true, message, gameData: [] });
                } else {
                    this.setState(
                        { error: false, message, gameData: data, gameFetch: true },
                    );
                }
            })
            .catch((error) => {
                alert(error.message);
                this.setState({ error: true, message: error.messge, gameData: [] });
            });

        //fetch clan data
        fetch("http://localhost:8080/clan/fetch/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                all: true,
            }),
        })
            .then((res) => res.json())
            .then(({ message, error, data }) => {
                if (error === true) {
                    alert(message);
                    this.setState({ message, error, clanData: [] });
                } else if (data.length === 0) {
                    alert("Clan doesn;t exist in our records");
                    // this.setState({message:"Clan doesn;t exist in our records",erro:false,clanData:{}})
                    this.props.history.push("/login");
                    return;
                } else {
                    //clanFetch successful
                    this.setState(
                        { message, error: false, clanData: data, clanFetch: true },
                    );

                    /*Fetch clanMemberData */
                    if (this.categoriseUser(localStorage.getItem("currentUser")) === 'player') {

                        fetch("http://localhost:8080/clan/fetchClanMemberData/", {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                                playerUsername: localStorage.getItem("currentUser"),
                            }),
                        })
                            .then(res => res.json())
                            .then(({ error, message, data }) => {
                                if (error === true) {
                                    alert(message);
                                    this.setState({ error: true, message })
                                } else if (error === false && data.length === 0) {
                                    // alert(message);
                                    this.setState({ error: false, message });

                                } else if (data.length > 0) {
                                    this.setState({ currentPlayerClan: data[0].C_name, error: false, message })
                                }
                            })




                    }

                }
            })
            .catch((error) => {
                alert(error.message);
                this.setState({ error: true, message: error.messge, clanData: [] });
            });

        //fetch company data
        fetch("http://localhost:8080/company/fetch/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                all: true,
            }),
        })
            .then((res) => res.json())
            .then(({ message, error, data }) => {
                if (error === true) {
                    alert(message);
                    this.setState({ message, error, companyData: [] });
                } else if (data.length === 0) {
                    alert("Company doesn't exist in our records");
                    // this.setState({message:"Clan doesn;t exist in our records",erro:false,clanData:{}})
                    this.props.history.push("/login");
                    return;
                } else {
                    this.setState(
                        { message, error: false, companyData: data, companyFetch: true },
                    );
                }
            })
            .catch((error) => {
                alert(error.message);
                this.setState({ error: true, message: error.messge, companyData: [] });
            });

        //fetch event data
        firestore.collection('events').get()
            .then((eventSnapshot) => {

                var eventArray = eventSnapshot.docs.map(event => event.data())
                this.setState({ eventData: eventArray, eventFetch: true });
            })

        /*Determine userType of current logged in user*/
        this.setState({ userType: this.categoriseUser(this.state.username) });



    }

    categoriseUser = (username) => {
        // if(!username) return;
        var temp1 = username
            .slice(0, username.length - 4)
            .split("")
            .reverse()
            .join("");

        var temp2 = temp1.slice(0, 6).split("").reverse().join("");
        if (temp2 === "player") return "player";

        temp2 = temp1.slice(0, 4).split("").reverse().join("");
        if (temp2 === "clan") return "clan";

        temp2 = temp1.slice(0, 7).split("").reverse().join("");
        if (temp2 === "company") return "company";
        else return "none";
    };

    render() {

        if (!localStorage.getItem("currentUser")) return (<></>);
        const DoughnutChartOptions = {
            title: {
                display: true,
                text: 'Data Distribution'
            },
            // scales: {
            //     //     yAxes: [
            //     //         {
            //     //             ticks: {
            //     //                 min: 0,
            //     //                 stepSize: 5
            //     //             }
            //     //         }
            //     //     ]
            // }
        }


        const GameChartOptions = {
            title: {
                display: true,
                text: 'Number of players in each game'
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            stepSize: 2
                        }
                    }
                ]
            }
        }
        const BarChartOptions = {
            title: {
                display: true,
                text: 'Clan Levels'
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            stepSize: 5
                        }
                    }
                ]
            }
        }

        const CODChartOptions = {
            title: {
                display: true,
                text: 'COD Standings'
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            stepSize: 5
                        }
                    }
                ]
            }
        }
        const FAUGChartOptions = {
            title: {
                display: true,
                text: 'FAUG Standings'
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            stepSize: 5
                        }
                    }
                ]
            }
        }
        const PUBGChartOptions = {
            title: {
                display: true,
                text: 'PUBG Standings'
            },
            scales: {
                yAxes: [
                    {
                        ticks: {
                            min: 0,
                            stepSize: 5
                        }
                    }
                ]
            }
        }


        if (this.state.playerFetch && this.state.gameFetch && this.state.clanFetch && this.state.companyFetch && this.state.eventFetch) {
            console.log(this.state);
            const { playerData, clanData, companyData, eventData, gameData } = this.state;

            var playerPUBGData = {};
            var playerCODData = {};
            var playerFAUGData = {};

            // playerData.map(pd => {
            //     playerGameData[pd.P_username]={};
            //     return 0;
            // })

            gameData.map(gd => {
                if (gd.G_name === "PUBG") {
                    playerPUBGData[gd.P_username] = gd.P_level;
                }
                if (gd.G_name === "FAUG") {
                    playerFAUGData[gd.P_username] = gd.P_level;
                }
                if (gd.G_name === "COD") {
                    playerCODData[gd.P_username] = gd.P_level;
                }

                return 0;
            })


            console.log(playerCODData, playerFAUGData, playerPUBGData);

            const GameChartData = {
                labels: ['PUBG', 'FAUG', 'COD'],
                datasets: [
                    {
                        label: 'Number of Players',
                        data: [Object.keys(playerPUBGData).length, Object.keys(playerFAUGData).length, Object.keys(playerCODData).length],
                        backgroundColor: [1,2,3].map(x => 'rgba(120,150,86,0.5)'),

                    }
                ]
            }

            const CODChartData = {
                labels: Object.keys(playerCODData),
                datasets: [
                    {
                        label: 'COD standings',
                        data: Object.values(playerCODData),
                        backgroundColor: Object.keys(playerCODData).map(x => 'rgba(230,150,86,0.5)'),

                    }
                ]
            }
            const FAUGChartData = {
                labels: Object.keys(playerFAUGData),
                datasets: [
                    {
                        label: 'COD standings',
                        data: Object.values(playerFAUGData),
                        backgroundColor: Object.keys(playerFAUGData).map(x => 'rgba(255,206,86,0.5)'),

                    }
                ]
            }
            const PUBGChartData = {
                labels: Object.keys(playerPUBGData),
                datasets: [
                    {
                        label: 'COD standings',
                        data: Object.values(playerPUBGData),
                        backgroundColor: Object.keys(playerPUBGData).map(x => 'rgba(230,206,0,0.5)'),
                    }
                ]
            }


            var clanLevelDistribution = {};

            for (var i = 0; i < clanData.length; i++) {
                clanLevelDistribution[clanData[i].C_name] = clanData[i].C_level;
            }


            const clanLevelDistributionChartData = {
                labels: Object.keys(clanLevelDistribution),
                datasets: [
                    {
                        label: 'Clan levels',
                        data: Object.values(clanLevelDistribution),
                        backgroundColor: clanData.map(x => 'rgba(150,255,86,0.2)'),

                    }
                ]
            }


            const DoughnutChartData = {
                labels: ['Player', 'Clan', 'Company', 'Event'],
                datasets: [ //each dataset object corresponds to one line in line chart
                    {
                        label: 'Data distribution in eSports',
                        data: [playerData.length, clanData.length, companyData.length, eventData.length],
                        backgroundColor: ['rgba(255,0,0,0.5)', 'rgba(230,206,86,0.5)', 'rgba(200,255,86,0.2)', 'rgba(150,206,86,0.5)'],

                    }
                ]
            }
            return (
                <div style={{ position: "relative", alignItems: 'center', justifyContent: 'center', margin: "10% 20%", width: "60%", height: "40%" }}>
                    <div style={{ margin: '20px 0px' }}>
                        <Doughnut data={DoughnutChartData} options={DoughnutChartOptions} />
                    </div>
                    <div style={{ margin: '20px 0px' }}>
                        <Bar data={GameChartData} options={GameChartOptions} />
                    </div>
                    <div style={{ margin: '20px 0px' }}>
                        <Bar data={clanLevelDistributionChartData} options={BarChartOptions} />
                    </div>
                    <div style={{ margin: '20px 0px' }}>
                        <Bar data={CODChartData} options={CODChartOptions} />
                    </div>
                    <div style={{ margin: '20px 0px' }}>
                        <Bar data={FAUGChartData} options={FAUGChartOptions} />
                    </div>
                    <div style={{ margin: '20px 0px' }}>
                        <Bar data={PUBGChartData} options={PUBGChartOptions} />
                    </div>
                </div>
            )
        } else {
            return <div className="loader">Loading.....</div>
        }


    }
}

export default Chart;
