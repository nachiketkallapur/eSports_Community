import { AppBar, Tabs, Tab, Grid, Card, Typography } from '@material-ui/core';
import React, { Component } from 'react'

class Dashboard extends Component {

    constructor(props) {
        super(props)
        if (!localStorage.getItem("currentUser")) {
            alert("Login to use dashboard");
            props.history.push('/login');
        }
        console.log(localStorage.getItem('currentUser'));

        this.state = {
            playerData: null,
            gameData: null,
            clanData: null,
            companyData: null,
            modifiedPlayerData: null,
            playerFetch: false,
            gameFetch: false,
            clanFetch: false,
            companyFetch: false,
            isPlayerDataModified: false,
            userType: "",    //userType of current logged in user,
            username: localStorage.getItem('currentUser'),
            message: "",
            error: false,
            tabIndex: 0
        }
    }

    async componentDidMount() {
        /*Fetch player data*/
        fetch('http://localhost:8080/player/fetch/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                all: true
            })
        })
            .then((res) => res.json())
            .then(({ data, message }) => {
                // console.log("PYD: ",data);
                if (data.length === 0) {
                    alert(message);
                    this.props.history.push("/login");
                    return;
                    // this.setState({ error: true, message, userType, username, playerData: {} });
                } else {
                    this.setState({ playerData: data, message, playerFetch: true });
                }
            })
            .catch((error) => {
                alert(error.message);
                this.setState({ error: true, message: error.messge })
            })

        /*Fetch game data*/
        fetch('http://localhost:8080/game/fetch/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                all: true
            })
        })
            .then(async (res) => await res.json())
            .then(({ error, message, data }) => {
                if (error === true) {
                    alert(message);
                    this.setState({ error: true, message, gameData: [] })
                } else if (data.length === 0) {
                    alert(message);
                    this.setState({ error: true, message, gameData: [] })
                } else {
                    this.setState({ error: false, message, gameData: data, gameFetch: true })
                }
            })
            .catch((error) => {
                alert(error.message);
                this.setState({ error: true, message: error.messge, gameData: [] })
            })

        /*Fetch clan data*/
        fetch('http://localhost:8080/clan/fetch/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                all: true
            })
        })
            .then(async (res) => res.json())
            .then(({ message, error, data }) => {
                if (error === true) {
                    alert(message);
                    this.setState({ message, error, clanData: [] })
                } else if (data.length === 0) {
                    alert("Clan doesn;t exist in our records");
                    // this.setState({message:"Clan doesn;t exist in our records",erro:false,clanData:{}})
                    this.props.history.push("/login");
                    return;
                }
                else {
                    this.setState({ message, error: false, clanData: data, clanFetch: true })
                }
            })
            .catch((error) => {
                alert(error.message);
                this.setState({ error: true, message: error.messge, clanData: [] })
            })

        /*Fetch company data*/
        fetch('http://localhost:8080/company/fetch/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                all: true
            })
        })
            .then(async (res) => res.json())
            .then(({ message, error, data }) => {
                if (error === true) {
                    alert(message);
                    this.setState({ message, error, companyData: [] })
                } else if (data.length === 0) {
                    alert("Company doesn't exist in our records");
                    // this.setState({message:"Clan doesn;t exist in our records",erro:false,clanData:{}})
                    this.props.history.push("/login");
                    return;
                }
                else {
                    this.setState({ message, error: false, companyData: data, companyFetch: true })
                }
            })
            .catch((error) => {
                alert(error.message);
                this.setState({ error: true, message: error.messge, companyData: [] })
            })

        /*Determine userType of current logged in user*/
        this.setState({ userType: this.categoriseUser(this.state.username) });


    }

    categoriseUser = (username) => {
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
    }

    handleTabChange = (event, value) => {
        this.setState({ tabIndex: value })
    }

    showPlayers = () => (
        <Grid container spacing={0} style={{ width: "100vw" }}>
            {
                this.state.playerData.map(player => (
                    <Grid item xs={3} key={player.P_username} style={{ cursor: "pointer", padding: "2px", height: "200px", margin: "5px 0px" }}>
                        <Card style={{
                            height: "100%",
                            // background: "#424242",
                            display: "flex", flexDirection: "column",
                            border: "3px solid black"
                        }}>
                            <Typography><u>Name:</u>{player.P_name} </Typography>
                            <Typography><u>Username:</u>{player.P_username} </Typography>
                            <Typography><u>Age:</u>{player.P_age}</Typography>
                            <Typography><u>City:</u>{player.P_city}</Typography>
                            <Typography><u>State:</u>{player.P_state}</Typography>
                            {
                                this.state.modifiedPlayerData[player.P_username]["gameData"]["PUBG"] && (
                                    <Typography><u>PUBG Level:</u>{this.state.modifiedPlayerData[player.P_username]["gameData"]["PUBG"]}</Typography>
                                )
                            }
                            {
                                this.state.modifiedPlayerData[player.P_username]["gameData"]["COD"] && (
                                    <Typography><u>COD Level:</u>{this.state.modifiedPlayerData[player.P_username]["gameData"]["COD"]}</Typography>
                                )
                            }
                            {
                                this.state.modifiedPlayerData[player.P_username]["gameData"]["FAUG"] && (
                                    <Typography><u>FAUG Level:</u>{this.state.modifiedPlayerData[player.P_username]["gameData"]["FAUG"]}</Typography>
                                )
                            }
                        </Card>
                    </Grid>
                ))
            }
        </Grid>
    )

    componentDidUpdate() {
        /*append game data of a particular player to corresponding playerData object*/
        var modifiedPlayerData = {};
        if (this.state.playerFetch && this.state.gameFetch && !this.state.isPlayerDataModified) {

            this.state.playerData.map(player => {
                player["gameData"] = {};
                modifiedPlayerData[player.P_username] = player;
                return 1;
            })

            this.state.gameData.map(gd => {
                modifiedPlayerData[gd.P_username]["gameData"][gd.G_name] = gd.P_level;
                return 1;
            })

            this.setState({ modifiedPlayerData, isPlayerDataModified: true })

            console.log(modifiedPlayerData['nachiket@player.com']);
        }
    }

    render() {



        return (
            <div>
                <AppBar position="static" color="default">
                    <Tabs
                        value={this.state.tabIndex}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                    >
                        <Tab label="Player" />
                        <Tab label="Clan" />
                        <Tab label="Company" />
                    </Tabs>
                </AppBar>
                {
                    this.state.tabIndex === 0 && this.state.playerFetch && this.state.isPlayerDataModified &&
                    (<this.showPlayers />)
                }
            </div>
        )
    }
}

export default Dashboard
