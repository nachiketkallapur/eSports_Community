import {
    AppBar,
    Tabs,
    Tab,
    Grid,
    Card,
    Typography,
    Button,
    TextField,
    CardMedia,
    CardActionArea,
} from "@material-ui/core";
import React, { Component } from "react";
import ClanImage from "../../images/clan.jpg";
import PlayerImage from "../../images/player.jpg";
import Image1 from "../../images/img1.jpg";
import Image2 from "../../images/img2.jpg";
import Image3 from "../../images/img3.jpg";
import ImageFour from "../../images/img4.jpg";

import './dashboard.styles.scss';

class Dashboard extends Component {
    constructor(props) {
        super(props);
        if (!localStorage.getItem("currentUser")) {
            alert("Login to use dashboard");
            props.history.push("/login");
        }

        console.log(localStorage.getItem("currentUser"));

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
            userType: "", //userType of current logged in user,
            username: localStorage.getItem("currentUser"),
            message: "",
            error: false,
            tabIndex: 0,
            newPlayerUsername: "",
        };
    }

    async componentDidMount() {
        if (!localStorage.getItem("currentUser")) return;
        /*Fetch player data*/
        fetch("http://localhost:8080/player/fetch/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                all: true,
            }),
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
                this.setState({ error: true, message: error.messge });
            });

        /*Fetch game data*/
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

        /*Fetch clan data*/
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
                    this.setState(
                        { message, error: false, clanData: data, clanFetch: true },
                    );
                }
            })
            .catch((error) => {
                alert(error.message);
                this.setState({ error: true, message: error.messge, clanData: [] });
            });

        /*Fetch company data*/
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

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    };
    handleTabChange = (event, value) => {
        this.setState({ tabIndex: value });
    };

    handleRequestToJoinClan = (clanEmail) => {
        /*Send a mail to clanEmail saying that currentUser(player)*/
        console.log(clanEmail);
        const playerUsername = localStorage.getItem('currentUser');

    };

    handleAddNewPlayerToClan = (event) => {
        event.preventDefault();
        const clanUsername = localStorage.getItem("currentUser");
        const playerUsername = this.state.newPlayerUsername;

        fetch("http://localhost:8080/clan/addNewPlayer/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clanUsername,
                playerUsername,
            }),
        })
            .then((res) => res.json())
            .then(({ error, message }) => {
                if (error === true) {
                    alert(message);
                    this.setState({ error: true, message });
                } else {
                    alert(message);
                    this.setState({ error: false, message });
                }
            })
            .catch((err) => {
                console.log(err.message);
                alert(err.message);
                this.setState({ error: true, message: err.message });
            });
    };

    showPlayers = () => (
        <Grid container spacing={0} style={{ width: "100%" }}>
            {this.state.playerData.map((player) => (
                <Grid
                    item
                    xs={3}
                    key={player.P_username}
                    style={{ padding: "2px", height: "420px", margin: "2px 0px" }}
                >
                    <Card
                        style={{
                            height: "100%",
                            // background: "#424242",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "3px solid black",
                            opacity: "0.65",
                        }}
                    >
                        <CardActionArea
                            style={{
                                position: "relative",
                                width: "50%",
                                float: "top"
                            }}
                        >
                            <CardMedia
                                style={{
                                    width: "100%",
                                    border: "1px solid",
                                    borderRadius: "50%",
                                }}
                                image={PlayerImage}
                                component="img"
                                alt="Player Image"
                                title="Player Image"
                            />
                        </CardActionArea>
                        <Typography><u>Name:</u>{player.P_name}</Typography>
                        <Typography><u>Age:</u>{player.P_age}</Typography>
                        <Typography><u>City:</u>{player.P_city}</Typography>
                        <Typography><u>State:</u>{player.P_state}</Typography>
                        {this.state
                            .modifiedPlayerData[player.P_username]["gameData"]["PUBG"] && (
                                <Typography>
                                    <u>PUBG Level:</u>
                                    {this.state
                                        .modifiedPlayerData[player.P_username]["gameData"]["PUBG"]}
                                </Typography>
                            )}
                        {this.state
                            .modifiedPlayerData[player.P_username]["gameData"]["COD"] && (
                                <Typography>
                                    <u>COD Level:</u>
                                    {this.state
                                        .modifiedPlayerData[player.P_username]["gameData"]["COD"]}
                                </Typography>
                            )}
                        {this.state
                            .modifiedPlayerData[player.P_username]["gameData"]["FAUG"] && (
                                <Typography>
                                    <u>FAUG Level:</u>
                                    {this.state
                                        .modifiedPlayerData[player.P_username]["gameData"]["FAUG"]}
                                </Typography>
                            )}
                    </Card>
                </Grid>
            ))}
        </Grid>
    );

    showClans = () => (
        <div>
            <Grid container spacing={0} style={{ width: "100%" }}>
                {this.state.clanData.map((clan) => (
                    <Grid
                        item
                        xs={3}
                        key={clan.C_username}
                        style={{ padding: "2px", height: "430px", margin: "5px 0px" }}
                    >
                        <Card
                            style={{
                                height: "100%",
                                // background: "#424242",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "3px solid black",
                                //backgroundColor: "#424242",
                                opacity: "0.65",
                            }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    // style={{
                                    //     width: "50%",
                                    //     border: "1px solid",
                                    //     borderRadius: "60%",
                                    // }}
                                    image={ClanImage}
                                    component="img"
                                    alt="Clan Image"
                                    title="Clan Image"
                                />
                            </CardActionArea>
                            <Typography><u>Name:</u>{clan.C_name}</Typography>
                            <Typography><u>Size:</u>{clan.C_size}</Typography>
                            <Typography><u>Leader username:</u>{clan.P_username}</Typography>
                            <Typography><u>Clan level:</u>{clan.C_level}</Typography>
                            <Typography><u>Category:</u>{clan.C_category}</Typography>
                            <Typography><u>Clan Game:</u>{clan.G_name}</Typography>
                            {this.state.userType === "player" && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ width: "50%", margin: "0% 25%" }}
                                    onClick={() => this.handleRequestToJoinClan(clan.C_email)}
                                >
                                    Request to Join
                                </Button>
                            )}
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {this.state.userType === "clan" && (
                <form onSubmit={this.handleAddNewPlayerToClan}>
                    <h2>Add players to clan</h2>
                    <TextField
                        required
                        id="filled-required"
                        label="New Player Username"
                        name="newPlayerUsername"
                        value={this.state.newPlayerUsername}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    />
                    <br />
                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                        style={{ width: "10%", margin: "0% 25%" }}
                    >
                        Add
          </Button>
                </form>
            )}
        </div>
    );

    componentDidUpdate() {
        /*append game data of a particular player to corresponding playerData object*/
        var modifiedPlayerData = {};
        if (
            this.state.playerFetch && this.state.gameFetch &&
            !this.state.isPlayerDataModified
        ) {
            this.state.playerData.map((player) => {
                player["gameData"] = {};
                modifiedPlayerData[player.P_username] = player;
                return 1;
            });

            this.state.gameData.map((gd) => {
                modifiedPlayerData[gd.P_username]["gameData"][gd.G_name] = gd.P_level;
                return 1;
            });

            this.setState({ modifiedPlayerData, isPlayerDataModified: true });

            // console.log(modifiedPlayerData['nachiket@player.com']);
        }
    }

    render() {
        if (!localStorage.getItem("currentUser")) return (<></>);
        // localStorage.removeItem("currentUser");
        // localStorage.setItem("currentUser","soul@clan.com")

        return (

            <div className='dashboard' 
            style={{ marginTop: "4%",
            height:this.state.tabIndex!==0?"100vh":"100%" }}>
                        
                <AppBar position="static" color="default" style={{opacity:"0.65"}}>
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
                {this.state.tabIndex === 0 && this.state.playerFetch &&
                    this.state.isPlayerDataModified &&
                    (<this.showPlayers />)}
                {this.state.tabIndex === 1 && this.state.clanFetch &&
                    (<this.showClans />)}
            </div>
        );
    }
}

export default Dashboard;
