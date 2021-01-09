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
    FormControl,
    FormLabel,
    FormControlLabel,
    RadioGroup,
    Radio
} from "@material-ui/core";
import React, { Component } from "react";
import ClanImage from "../../images/clan.jpg";
import PlayerImage from "../../images/player.jpg";
import EventImage from "../../images/comp5.jpg";
// import Image1 from "../../images/img1.jpg";
// import Image2 from "../../images/img2.jpg";
// import Image3 from "../../images/img3.jpg";
// import ImageFour from "../../images/img4.jpg";
import { firestore } from '../../firebase/firebase.utils';
import firebase from '../../firebase/firebase.utils'
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
            eventData: null,
            modifiedPlayerData: null,
            playerFetch: false,
            gameFetch: false,
            clanFetch: false,
            companyFetch: false,
            eventFetch: false,
            isPlayerDataModified: false,
            newEventName: "",
            newEventDescription: "",
            newEventLocation: "",
            newEventDateTime: "",
            newEventGame: "PUBG",
            newEventOrganiserEmail: "",
            userType: "", //userType of current logged in user,
            username: localStorage.getItem("currentUser"),
            currentPlayerClan: "NA", //NA-Not Applicable
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

        /*Fetch events data from firestore*/

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

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    };
    handleTabChange = (event, value) => {
        this.setState({ tabIndex: value });
    };

    handleRequestToJoinClan = (clanEmail, clanName) => {
        /*Send a mail to clanEmail saying that currentUser(player)*/
        console.log(clanEmail);
        const playerUsername = localStorage.getItem('currentUser');
        fetch("http://localhost:8080/clan/requestToJoin/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clanEmail,
                playerUsername,
            })
        })
            .then(res => res.json())
            .then(({ error, message }) => {
                if (error === true) {
                    alert(message);
                    this.setState({ error: true, message })
                } else {
                    alert("Request sent successfully to " + clanName + "\nWait for their reply");
                    this.setState({ error: false, message })
                }
            })
            .catch(err => {
                alert(err.message);
            })

    };

    handleAddNewPlayerToClan = (event) => {
        event.preventDefault();
        const clanUsername = localStorage.getItem("currentUser");
        const playerUsername = this.state.newPlayerUsername;

        const playerObject = this.state.playerData.filter(player => player.P_username === playerUsername);
        const playerEmail = playerObject.length > 0 ? playerObject[0].P_email : "";
        const playerName = playerObject.length > 0 ? playerObject[0].P_name : "";

        fetch("http://localhost:8080/clan/addNewPlayer/", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                clanUsername,
                playerUsername,
                playerEmail,
                playerName
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

    handleNewEvent = (event) => {
        event.preventDefault();
        const {
            newEventName,
            newEventDescription,
            newEventGame,
            newEventLocation,
            newEventDateTime,
            newEventOrganiserEmail,
        } = this.state;

        const organiser = localStorage.getItem('currentUser');

        firestore.doc(`events/${newEventName}`).set({
            eventName: newEventName,
            eventGame: newEventGame,
            eventDescription: newEventDescription,
            eventLocation: newEventLocation,
            eventDataTime: newEventDateTime,
            eventOrganiser: organiser,
            eventOrganiserEmail: newEventOrganiserEmail,
            interestedUsers: [],
            confirmedUsers: []
        })
            .then(() => {
                alert("Event Registered Successfully");
                this.setState({
                    newEventName: "",
                    newEventGame: "PUBG",
                    newEventDescription: "",
                    newEventLocation: "",
                    newEventDateTime: ""
                })
                window.location.reload();
            })
            .catch((error) => {
                console.log(error);
                alert(error.message)
            })
    }

    handleEventInterest = (eventName) => {
        firestore.doc(`events/${eventName}`).update({
            interestedUsers: firebase.firestore.FieldValue.arrayUnion(localStorage.getItem('currentUser'))
        })
            .then(() => alert("Interest saved successfully"))
            .catch((err) => {
                console.log(err);
                alert("Error in saving interest\n" + err.message)
            })

    }

    handleConfirmEventParticipation = (eventObject) => {
        /*eventObject for confirming participation*/
        localStorage.setItem("eventObject", JSON.stringify(eventObject));
        this.props.history.push('/confirmParticipation');
    }

    showPlayers = () => (
        <Grid container spacing={0} style={{ width: "100%", marginBottom: "2px" }}>
            {this.state.playerData.map((player) => (
                <Grid
                    item
                    xs={3}
                    key={player.P_username}
                    style={{ padding: "2px", height: "400px", margin: "5px 0px" }}
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
                            {this.state.userType === "player" && this.state.currentPlayerClan === 'NA' && (
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ width: "50%", margin: "0% 25%" }}
                                    onClick={() => this.handleRequestToJoinClan(clan.C_email, clan.C_name)}
                                >
                                    Request to Join
                                </Button>
                            )}
                            {this.state.userType === "player" && this.state.currentPlayerClan === clan.C_name && (
                                <Button
                                    disabled
                                    variant="contained"
                                    color="primary"
                                    type="button"
                                    style={{ width: "50%", margin: "0% 25%" }}
                                    onClick={() => this.handleRequestToJoinClan(clan.C_email, clan.C_name)}
                                >
                                    Already member
                                </Button>
                            )

                            }
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {this.state.userType === "clan" && (
                <form onSubmit={this.handleAddNewPlayerToClan} autoComplete='off'>
                    <br />
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

    showCompanies = () => (
        <div>
            <Grid container spacing={0} style={{ width: "100%" }}>
                {this.state.companyData.map((company) => (
                    <Grid
                        item
                        xs={3}
                        key={company.C_username}
                        style={{ padding: "2px", height: "300px", margin: "5px 0px" }}
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
                            <CardActionArea
                                style={{
                                    position: "relative",
                                    width: "100%",
                                    // float: "top",
                                    left: "25%",
                                    right: "25%"
                                }}>
                                <CardMedia
                                    style={{
                                        width: "50%",
                                        border: "1px solid",
                                        borderRadius: "50%",
                                    }}
                                    image={PlayerImage}
                                    component="img"
                                    alt="Clan Image"
                                    title="Clan Image"
                                />
                            </CardActionArea>
                            <Typography><u>Name:</u>{company.Comp_name}</Typography>
                            <Typography><u>Location: </u>{company.Comp_location}</Typography>
                            <Typography><u>Bio:</u>{company.Comp_bio}</Typography>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {this.state.userType === "company" && (
                <form onSubmit={this.handleNewEvent} autoComplete='off'>
                    <h2>Add Event Details</h2>
                    <TextField
                        required
                        id="filled-required-1"
                        label="Event Name"
                        name="newEventName"
                        value={this.state.newEventName}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    />
                    <br />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Event Game</FormLabel>
                        <RadioGroup row aria-label="position" name="newEventGame"
                            value={this.state.newEventGame}
                            onChange={this.handleChange}>
                            <FormControlLabel
                                value="PUBG"
                                control={<Radio color="primary" />}
                                label="PUBG"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value="COD"
                                control={<Radio color="primary" />}
                                label="COD"
                                labelPlacement="top"
                            />
                            <FormControlLabel
                                value="FAUG"
                                control={<Radio color="primary" />}
                                label="FAUG"
                                labelPlacement="top"
                            />

                        </RadioGroup>
                    </FormControl>
                    <br />
                    <TextField
                        required
                        id="filled-required-2"
                        label="Event Description"
                        name="newEventDescription"
                        value={this.state.newEventDescription}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    />
                    <br />
                    <TextField
                        required
                        id="filled-required-3"
                        label="Event Location"
                        name="newEventLocation"
                        value={this.state.newEventLocation}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    />
                    <br />
                    <TextField
                        required
                        id="filled-required-4"
                        label="Event Date and Time"
                        name="newEventDateTime"
                        value={this.state.newEventDateTime}
                        type="datetime-local"
                        // defaultValue="2017-05-24T10:30"
                        // className={classes.textField}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    />
                    <br />
                    <TextField
                        required
                        id="filled-required-5"
                        label="Event Organiser Email"
                        name="newEventOrganiserEmail"
                        value={this.state.newEventOrganiserEmail}
                        type="email"
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
                        Add Event
                    </Button><br />
                </form>
            )}
        </div>
    )

    showEvents = () => (
        <div>
            <Grid container spacing={0}>

                {
                    this.state.eventData.map(event => (
                        <Grid item
                            xs={3}
                            key={event.eventName}
                            style={{ padding: "2px", height: "450px", margin: "5px 0px" }}
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
                                <CardActionArea
                                    style={{
                                        position: "relative",
                                        width: "100%",
                                        // float: "top",
                                        left: "25%",
                                        right: "25%"
                                    }}>
                                    <CardMedia
                                        style={{
                                            width: "50%",
                                            border: "1px solid",
                                            borderRadius: "50%",
                                        }}
                                        image={EventImage}
                                        component="img"
                                        alt="Event Image"
                                        title="Event Image"
                                    />
                                </CardActionArea>
                                <Typography><u>Name:</u>{event.eventName}</Typography>
                                <Typography><u>Game:</u>{event.eventGame}</Typography>
                                <Typography><u>Description:</u>{event.eventDescription}</Typography>
                                <Typography><u>Date:</u>{event.eventDataTime.split('T')[0]}</Typography>
                                <Typography><u>Time:</u>{event.eventDataTime.split('T')[1]}</Typography>
                                <Typography><u>Place:</u>{event.eventLocation}</Typography>
                                <Typography><u>Organiser:</u>{event.eventOrganiser}</Typography>
                                {
                                    this.state.userType === 'player' || this.state.userType === 'clan' ?
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            type="button"
                                            style={{ width: "50%", margin: "0% 25%" }}
                                            onClick={(e) => this.handleEventInterest(event.eventName)}
                                        >
                                            Interested!
                                        </Button>
                                        :
                                        event.eventOrganiser === localStorage.getItem("currentUser") ?
                                            event.interestedUsers.length > 0 ?
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    type="button"
                                                    style={{ width: "70%", margin: "0% 25%" }}
                                                    onClick={(e) => this.handleConfirmEventParticipation(event)}
                                                >
                                                    Confirm Participation!
                                                </Button>
                                                : <Button
                                                    disabled
                                                    variant="contained"
                                                    color="primary"
                                                    type="button"
                                                    style={{ width: "50%", margin: "0% 25%" }}
                                                >
                                                    No one interested yet
                                                </Button>
                                            : <></>


                                }

                            </Card>
                        </Grid>
                    ))
                }
            </Grid>
        </div>
    )

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
                style={{
                    marginTop: "4%",
                    height: (this.state.tabIndex === 0) ||
                        (this.state.tabIndex === 2 && this.state.userType === "company") ||
                        (this.state.tabIndex === 1 && this.state.userType === 'clan')
                        ? "100%" : "100vh"
                }}>

                <AppBar position="static" color="default" style={{ opacity: "0.65" }}>
                    <Tabs
                        value={this.state.tabIndex}
                        onChange={this.handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="full width tabs example"
                        style={{ fontWeight: "bolder" }}
                    >
                        <Tab label="Player" />
                        <Tab label="Clan" />
                        <Tab label="Company" />
                        <Tab label="Events" />
                    </Tabs>
                </AppBar>
                {this.state.tabIndex === 0 && this.state.playerFetch &&
                    this.state.isPlayerDataModified &&
                    (<this.showPlayers />)}
                {this.state.tabIndex === 1 && this.state.clanFetch &&
                    (<this.showClans />)}
                {this.state.tabIndex === 2 && this.state.companyFetch &&
                    (<this.showCompanies />)}
                {this.state.tabIndex === 3 && this.state.eventFetch &&
                    (<this.showEvents />)}
            </div>
        );
    }
}

export default Dashboard;
