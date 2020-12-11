import { TrainOutlined } from '@material-ui/icons';
import React, { Component } from 'react'
import UpdatePlayer from '../../components/update-player/update-player.component';

class UpdateProfile extends Component {

    state = {
        username: "",
        userType: "",
        playerData: null,
        youtubeData: null,
        citystateData: null,
        gameData: [],
        gameFetch:false,
        playerFetch:false,
        youtubeFetch:false,
        error: false,
        message: ""
    }

    componentWillMount() {
        const { username } = this.props.match.params;
        const userType = this.categoriseUser(username);

        this.setState({ username, userType });

        if (userType === "none") {
            alert("Invalid user");
            this.props.history.push("/login");
        }

        if (userType === "player") {

            /*Fetch player data*/
            fetch('http://localhost:8080/player/fetch/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    playerUsername: username,
                    all: false
                })
            })
                .then((res) => res.json())
                .then(({ data, message }) => {
                    // console.log("PYD: ",data);
                    if (data.length === 0) {
                        alert(message);
                        this.props.history.push("/");
                        return;
                        // this.setState({ error: true, message, userType, username, playerData: {} });
                    } else {
                        this.setState({ playerData: data[0], username, userType, message ,playerFetch:true });
                    }
                })
                .catch((error) => {
                    alert(error.message);
                    this.setState({ error: true, message: error.messge, username, userType })
                })

            /*Fetch YT data*/
            fetch('http://localhost:8080/youtube/fetch/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    playerUsername: username,
                    all: false
                })
            })
                .then((res) => res.json())
                .then(({ data, message, error }) => {
                    // console.log("YTD: ",data);
                    if (error) {
                        alert(message);
                        this.setState({ error: true, message, youtubeData: {} })
                    } else if (data.length === 0) {
                        // console.log("Line63");
                        alert(message);
                        this.setState({ error: false, message, youtubeData: {} })
                    }
                    else {
                        this.setState({ error: false, youtubeData: data[0], message,youtubeFetch:true })
                    }

                })
                .catch((error) => {
                    alert(error.message);
                    this.setState({ error: true, message: error.messge, youtubeData: {} })
                })

            /*Fetch game data*/

            fetch('http://localhost:8080/game/fetch/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    playerUsername:username,
                    all: false
                })
            })
                .then(async (res) => await res.json())
                .then(({ error, message, data }) => {
                    if (error === true) {
                        alert(message);
                        this.setState({ error: true, message, gameData: [] })
                    } else if (data.length === 0) {
                        alert(message);
                        this.setState({ error: false, message, gameData: [],gameFetch:true })
                    } else {
                        this.setState({ error: false, message, gameData: data,gameFetch:true })
                    }
                })
                .catch((error) => {
                    alert(error.message);
                    this.setState({ error: true, message: error.messge, gameData: [] })
                })

            // fetch('http://localhost:8080/citystate/fetch/', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify({
            //         playerCity: this.state.playerData.P_city,
            //         all: false
            //     })
            // })
            //     .then(async (res) => await res.json())
            //     .then(({ message, data, error }) => {
            //         console.log("Message: ", message);
            //         if (error === true) {
            //             alert(message);
            //             this.setState({ error: true, message, citystateData: {} })
            //         } else if (data.length === 0) {
            //             // console.log("Message: ",message);
            //             alert(message);
            //             this.setState({ error: false, message, citystateData: {} })
            //         } else {
            //             this.setState({ error: false, message, citystateData: data[0] })
            //         }
            //     })
            //     .catch((error) => {
            //         alert(error.message);
            //         this.setState({ error: true, message: error.messge, citystateData: {} })
            //     })





        }
        else if (userType === "clan") {

        }
        else if (userType === "company") {

        }
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

    render() {

        
        console.log(this.state);
        if (this.state.error === false && this.state.userType === "player"
            && this.state.playerFetch && this.state.gameFetch && this.state.youtubeFetch) {
            // console.log(1);
            return (
                <div>
                    <UpdatePlayer
                        playerData={this.state.playerData}
                        youtubeData={this.state.youtubeData}
                        gameData={this.state.gameData}
                    />
                </div>
            )
        } else {

            return (
                <h1>Update Profile Page</h1>
            )
        }

    }
}

export default UpdateProfile;
