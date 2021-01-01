import React, { Component } from 'react'


import {
    TextField,
    Button,
    // FormControl,
    // FormLabel,
    // RadioGroup,
    // Radio,
    FormControlLabel,
    Checkbox,
    FormGroup
} from '@material-ui/core/';


import './update-player.styles.scss';

class UpdatePlayer extends Component {

    constructor(props) {
        super(props)
        const { playerData, youtubeData, gameData, isGameRecordPresent } = this.props;
        this.state = {
            ...playerData,
            ...youtubeData,
            isGameRecordPresent,
            gameData,
            pubg: false,
            cod: false,
            faug: true,
            pubgLevel: 0,
            codLevel: 0,
            faugLevel: 0,
            pubgPresentPreviously: false,
            codPresentPreviously: false,
            faugPresentPreviously: false,
            message: "",
            error: false
        };

        console.log(this.props);


    }

    componentWillMount() {
        var pubgLevel = 0, codLevel = 0, faugLevel = 0, pubg = false, cod = false, faug = false;
        var pubgPresentPreviously = false, codPresentPreviously = false, faugPresentPreviously = false;
        this.state.gameData.map(gd => {
            if (gd.G_name === "PUBG") {
                pubgLevel = gd.P_level;
                pubg = true;
                pubgPresentPreviously = true;
            } else if (gd.G_name === "FAUG") {
                faugLevel = gd.P_level;
                faug = true;
                faugPresentPreviously = true;
            } else if (gd.G_name === "COD") {
                codLevel = gd.P_level;
                cod = true;
                codPresentPreviously = true;
            }
            return 1;

        })


        // console.log(cod,pubg,faug);

        var isGameRecordPresent = this.state.gameData.length > 0 ? true : false;

        this.setState({ pubgLevel, faugLevel, codLevel, pubg, cod, faug, isGameRecordPresent, pubgPresentPreviously, faugPresentPreviously, codPresentPreviously },
            () => console.log(this.state));

    }



    handleSubmit = (event) => {
        event.preventDefault();

        const { P_name, P_username, P_city, P_state, P_age, P_email, Y_channelName,
            pubg, cod, faug, pubgLevel, codLevel, faugLevel, isGameRecordPresent,
            pubgPresentPreviously, codPresentPreviously, faugPresentPreviously } = this.state;

        /*update player table*/
        fetch('http://localhost:8080/player/update/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ P_name, P_username, P_city, P_state, P_age, P_email, Y_channelName })
        })
            .then(async (res) => await res.json())
            .then(({ message, error }) => {
                if (error === true) {
                    alert(message);
                    this.setState({ message, error: true })
                } else {
                    // console.log("Message: ",message);
                    this.setState({ message, error: false });
                }
            })
            .catch(err => {
                alert(err.message);
                this.setState({ message: err.message, error: true })
            })


        fetch('http://localhost:8080/game/update/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                P_username, pubg, cod, faug, isGameRecordPresent,
                pubgLevel: parseInt(pubgLevel), codLevel: parseInt(codLevel), faugLevel: parseInt(faugLevel),
                pubgPresentPreviously, codPresentPreviously, faugPresentPreviously
            })
        })
            .then(async (res) => await res.json())
            .then(({ message, error }) => {
                if (error === true) {
                    alert(message);
                    this.setState({ message, error: true });
                } else {
                    // if (message==="player_plays_game table updated successfully")
                    alert("Successfully updated profile")
                    this.setState({ message, error: false });
                }
            })
            .catch(err => {
                alert(err.message);
                this.setState({ message: err.message, error: true })
            })


    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ [name]: value }, () => console.log(this.state));
    }

    handleCheckboxChange = (event) => {
        this.setState({ [event.target.name]: event.target.checked }, () => console.log(this.state));
    }
    render() {
        const { P_name, P_username, P_city, P_state, P_age, P_email, Y_channelName, pubg, cod, faug,
            pubgLevel, faugLevel, codLevel } = this.state;
        // if(!(playerData || youtubeData || gameData)){
        //     this.setState({playerData,youtubeData,gameData},() => console.log(this.state));
        // }
        // console.log("In render",this.props);

        return (
            <div>
                <br/>
                <h2>Player Profile</h2> 
                <form className='update-player-form' autoComplete="off" onSubmit={this.handleSubmit}>
                    <div>
                        <TextField
                            required
                            id="filled-required-1"
                            label="Player Name"
                            name="P_name"
                            defaultValue={P_name}
                            variant="filled"
                            onChange={this.handleChange}
                            style={{ width: "350px", margin: "5px 0px" }}
                        /><br />
                        <TextField
                            disabled
                            id="filled-required-2"
                            label="Player username"
                            name="P_username"
                            defaultValue={P_username}
                            variant="filled"
                            onChange={this.handleChange}
                            style={{ width: "350px", margin: "5px 0px" }}
                        /><br />
                        <TextField
                            required
                            id="filled-required-3"
                            label="Player Age"
                            name="P_age"
                            defaultValue={P_age}
                            variant="filled"
                            type="number"
                            onChange={this.handleChange}
                            style={{ width: "350px", margin: "5px 0px",color:"blue" }}
                        /><br />
                        <TextField
                            required
                            id="filled-required-7"
                            label="Player Email"
                            name="P_email"
                            defaultValue={P_email}
                            type="email"
                            variant="filled"
                            onChange={this.handleChange}
                            style={{ width: "350px", margin: "5px 0px" }}
                        /><br />
                        <TextField
                            disabled
                            id="filled-required-4"
                            label="Player City"
                            name="P_city"
                            defaultValue={P_city}
                            variant="filled"
                            onChange={this.handleChange}
                            style={{ width: "350px", margin: "5px 0px" }}
                        /><br />
                        <TextField
                            disabled
                            id="filled-required-5"
                            label="Player State"
                            name="P_state"
                            defaultValue={P_state}
                            variant="filled"
                            onChange={this.handleChange}
                            style={{ width: "350px", margin: "5px 0px" }}
                        /><br />
                        <TextField
                            id="filled-required-6"
                            label="Youtube Channel"
                            name="Y_channelName"
                            defaultValue={Y_channelName}
                            variant="filled"
                            onChange={this.handleChange}
                            style={{ width: "350px", margin: "5px 0px" }}
                        />

                        <FormGroup row style={{ alignItems: "center", justifyContent: "center" }}>
                            <FormControlLabel
                                disabled={
                                    pubg === true ? true : false
                                }
                                control={<Checkbox checked={pubg} onChange={this.handleCheckboxChange} name="pubg" />}
                                label="PUBG"
                            />
                            <FormControlLabel
                                disabled={
                                    cod === true ? true : false
                                }
                                control={<Checkbox checked={cod} onChange={this.handleCheckboxChange} name="cod" />}
                                label="COD"
                            />
                            <FormControlLabel
                                disabled={
                                    faug === true ? true : false
                                }
                                control={<Checkbox checked={faug} onChange={this.handleCheckboxChange} name="faug" />}
                                label="FAUG"
                            />
                        </FormGroup>
                        {
                            this.state.pubg && (
                                <>
                                    <TextField
                                        required
                                        id="filled-required-1"
                                        label="PUBG Level"
                                        name="pubgLevel"
                                        defaultValue={pubgLevel}
                                        type="number"
                                        variant="filled"
                                        onChange={this.handleChange}
                                        style={{ width: "350px", margin: "5px 0px" }}
                                    /><br />
                                </>
                            )
                        }
                        {
                            this.state.cod && (
                                <>
                                    <TextField
                                        required
                                        id="filled-required-1"
                                        label="COD Level"
                                        name="codLevel"
                                        defaultValue={codLevel}
                                        variant="filled"
                                        type="number"
                                        onChange={this.handleChange}
                                        style={{ width: "350px", margin: "5px 0px" }}
                                    /><br />
                                </>
                            )
                        }
                        {
                            this.state.faug && (
                                <>
                                    <TextField
                                        required
                                        id="filled-required-1"
                                        label="FAUG Level"
                                        name="faugLevel"
                                        defaultValue={faugLevel}
                                        variant="filled"
                                        type="number"
                                        onChange={this.handleChange}
                                        style={{ width: "350px", margin: "5px 0px" }}
                                    /><br />
                                </>
                            )
                        }
                    </div><br />

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Update Profile
                    </Button>

                </form>
            </div>
        )
    }
}

export default UpdatePlayer
