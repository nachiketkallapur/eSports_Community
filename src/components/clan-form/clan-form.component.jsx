import React, { Component } from 'react';
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

class ClanForm extends Component {

    state = {
        clanName: "",
        clanCategory: "casual",
        clanSize: "",
        clanGame: "",
        clanUsername: "",
        clanPassword: "",
        res: "",
        err: ""
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:8080/clan/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
        })
            .then(async (res) => await this.setState({ res: await res.text() }))
            .catch(async (error) => await this.setState({ err: true, res: error }))
            .finally(res => {
                alert(this.state.res);
                if (this.state.res === "Successfully added data to database") {
                    localStorage.setItem('currentUser', this.state.clanUsername);
                    this.props.history.push(`/updateProfile/${this.state.clanUsername}`);
                }
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value }, () => console.log(this.state));
    }

    render() {
        const {
            clanName,
            clanCategory,
            clanSize,
            clanGame,
            clanUsername,
            clanPassword
        } = this.state;
        return (
            <div>
                <h1>Register Form for clan</h1>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <TextField
                        required
                        id="filled-required-1"
                        label="Clan Name"
                        name="clanName"
                        value={clanName}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-2"
                        label="Clan Game"
                        name="clanGame"
                        value={clanGame}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <FormControl component="fieldset">
                        <FormLabel component="legend">Clan Category</FormLabel>
                        <RadioGroup
                            aria-label="clanCategory"
                            name="clanCategory"
                            value={clanCategory}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel
                                value="casual"
                                control={<Radio />}
                                label="Casual"
                            />
                            <FormControlLabel
                                value="competitive"
                                control={<Radio />}
                                label="Competitive"
                            />
                        </RadioGroup>
                    </FormControl>
                    <br />
                    <TextField
                        required
                        id="filled-required-3"
                        label="Clan Size"
                        name="clanSize"
                        type="number"
                        value={clanSize}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-4"
                        label="Clan Username"
                        name="clanUsername"
                        value={clanUsername}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-5"
                        label="Clan Password"
                        name="clanPassword"
                        value={clanPassword}
                        type="password"
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br /><br />
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

export default withRouter(ClanForm);
