import React, { Component } from 'react'

import {
    TextField,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core/';
import { withRouter } from 'react-router-dom';

// import DateFnsUtils from '@date-io/date-fns';

// import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

class PlayerForm extends Component {
    state = {
        playerName: "",
        playerAge: "",
        playerSex: "male",
        playerCity: "",
        playerState: "",
        playerYTChannel: "",
        playerUsername: "",
        playerPassword: "",
        res: "",
        err: false
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        fetch('http://localhost:8080/player/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
        })
            .then(async (res) => this.setState({ res: await res.text() }))
            .catch((error) => this.setState({ res: error, err: true }))
            .finally(res => {

                console.log(this.state);
                alert(this.state.res);
                if (this.state.res === "Successfully added data to database") {
                    this.props.history.push(`/updateProfile/${this.state.playerUsername}`);
                }

            })
    }
        



    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value }, () => console.log(this.state))
    };

    // handleDateChange = (date) => {
    //     this.setState({ playerYTStartDate: date })
    // }

    render() {

        console.log(this.props);

        const {
            playerName,
            playerAge,
            playerSex,
            playerCity,
            playerState,
            playerYTChannel,
            playerUsername,
            playerPassword
        } = this.state;



        return (
            <div>
                <h2>Register Form for player</h2>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <TextField
                        required
                        id="filled-required-1"
                        label="Player Name"
                        name="playerName"
                        value={playerName}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-2"
                        label="Player Age"
                        name="playerAge"
                        value={playerAge}
                        type="number"
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Player Sex</FormLabel>

                        <RadioGroup
                            aria-label="playerSex"
                            name="playerSex"
                            value={playerSex}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel
                                value="male"
                                control={<Radio />}
                                label="Male"
                            />
                            <FormControlLabel
                                value="female"
                                control={<Radio />}
                                label="Female"
                            />
                            <FormControlLabel
                                value="others"
                                control={<Radio />}
                                label="Others"
                            />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <TextField
                        required
                        id="filled-required-3"
                        label="Player City"
                        name="playerCity"
                        value={playerCity}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-4"
                        label="Player State"
                        name="playerState"
                        value={playerState}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-5"
                        label="Player Username(for login puspose)"
                        name="playerUsername"
                        value={playerUsername}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-6"
                        label="Player Password(for login puspose)"
                        name="playerPassword"
                        value={playerPassword}
                        type="password"
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        id="filled-required-7"
                        label="Player YouTube Channel Name"
                        name="playerYTChannel"
                        value={playerYTChannel}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    {/* {
                        this.state.playerYTChannel && (
                            <div>
                                <TextField
                                    id="filled-required"
                                    label="Number of subscribers as of now"
                                    name="playerYTSubscribers"
                                    value={playerYTSubscribers}
                                    variant="filled"
                                    type="number"
                                    onChange={this.handleChange}
                                    style={{ width: "350px", margin: "5px 0px" }}
                                /><br />
                            </div>
                        )
                    }
                    {
                        this.state.playerYTChannel && (
                            <div>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        disableToolbar
                                        variant="inline"
                                        format="MM/dd/yyyy"
                                        margin="normal"
                                        id="date-picker-inline"
                                        label="Date picker inline"
                                        value={playerYTStartDate}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                        style={{ width: "350px", margin: "5px 0px" }}
                                    />
                                </MuiPickersUtilsProvider>
                                <br /><br />
                            </div>
                        )
                    } */}

                    <Button
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </form>
            </div>
        )
    }
}

export default withRouter(PlayerForm);
