import React from 'react'

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



class RegisterForm extends React.Component {

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

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value }, () => console.log(this.state))
    };

    handleDateChange = (date) => {
        this.setState({ playerYTStartDate: date })
    }

    render() {
        const { userType } = this.props.match.params;
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

        if (userType === "player") {
            return (
                <div>
                    <h1>Register Form for {userType}</h1>
                    <form>
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
                                aria-label="userType"
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
                            required
                            id="filled-required"
                            label="Player YouTube Channel Name"
                            name="playerYTChannel"
                            value={playerYTChannel}
                            variant="filled"
                            onChange={this.handleChange}
                            style={{ width: "350px", margin: "5px 0px" }}
                        /><br />
                        <TextField
                            required
                            id="filled-required"
                            label="Number of subscribers as of now"
                            name="playerYTSubscribers"
                            value={playerYTSubscribers}
                            variant="filled"
                            type="number"
                            onChange={this.handleChange}
                            style={{ width: "350px", margin: "5px 0px" }}
                        /><br />
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
                        <br /><br/>
                        <Button
                            variant="contained"
                            color="primary"
                        >
                            Submit
                        </Button>
                    </form>
                </div>
            )
        }
        else if (userType === "clan") {
            return (
                <div>
                    <h1>Register Form for {userType}</h1>
                </div>
            )
        }
        else if (userType === "company") {
            return (
                <div>
                    <h1>Register Form for {userType}</h1>
                </div>
            )
        }
        else {
            return (
                <div>
                    <h1>Couldn't identify user</h1>
                </div>
            )
        }
    }


}

export default RegisterForm; 
