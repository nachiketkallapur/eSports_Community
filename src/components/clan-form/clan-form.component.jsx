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

class ClanForm extends Component {

    state = {
        clanName: "",
        clanCategory: "casual",
        clanSize: "",
        clanGame: ""
    }

    handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:8080/clan/',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
        })
        .then(res => res.text())
        .then(res => console.log(res))
        .catch(err => err.message)
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
            clanGame
        } = this.state;
        return (
            <div>
                <h1>Register Form for clan</h1>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <TextField
                        required
                        id="filled-required"
                        label="Clan Name"
                        name="clanName"
                        value={clanName}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required"
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
                        id="filled-required"
                        label="Clan Size"
                        name="clanSize"
                        type="number"
                        value={clanSize}
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

export default ClanForm;
