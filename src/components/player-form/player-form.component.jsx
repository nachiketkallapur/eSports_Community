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

import DateFnsUtils from '@date-io/date-fns';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

class PlayerForm extends Component {
    state = {
        playerName: "",
        playerAge: "",
        playerSex: "male",
        playerCity: "",
        playerState: "",
        playerYTChannel: "",
        playerYTStartDate: new Date(),
        playerYTSubscribers: ""
    }

    handleSubmit = (event) => {
        event.preventDefault();  
    }
    
    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value }, () => console.log(this.state))
    };

    handleDateChange = (date) => {
        this.setState({ playerYTStartDate: date })
    }

    render() {
        const {
            playerName,
            playerAge,
            playerSex,
            playerCity,
            playerState,
            playerYTChannel,
            playerYTStartDate,
            playerYTSubscribers
        } = this.state;
        return (
            <div>
                <h1>Register Form for player</h1>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <TextField
                        required
                        id="filled-required"
                        label="Player Name"
                        name="playerName"
                        value={playerName}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required"
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
                        id="filled-required"
                        label="Player City"
                        name="playerCity"
                        value={playerCity}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required"
                        label="Player State"
                        name="playerState"
                        value={playerState}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        id="filled-required"
                        label="Player YouTube Channel Name"
                        name="playerYTChannel"
                        value={playerYTChannel}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    {
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
                    }

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

export default PlayerForm;
