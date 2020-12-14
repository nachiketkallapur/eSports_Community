import React, { Component } from 'react';
import {
    TextField,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    Radio,
    FormControlLabel
} from '@material-ui/core/';

import './update-clan.styles.scss';

class UpdateClan extends Component {

    constructor(props) {
        super(props);
        this.state={
            ...this.props.clanData,
            message:"",
            error:false
        }

    }

    componentDidMount() {
        if (this.props.clanData.G_name) {
            this.setState({
                gamePresentPreviously: true
            })
        } else {
            this.setState({
                gamePresentPreviously: false
            })
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { C_username, C_name, C_category, C_size, G_name } = this.state;

        fetch('http://localhost:8080/clan/update/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ C_username, C_name, C_category, C_size: parseInt(C_size), G_name })
        })
            .then(async (res) => await res.json())
            .then(({ message, error }) => {
                if (error) {
                    alert(error);
                    this.setState({ message, error: true });
                } else {
                    alert(message);
                    this.setState({ message, error: false })
                }
            })
            .catch(err => {
                console.log(err.message);
                alert(err.message);
                this.setState({ message: err.message, error: true });
            })

    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value }, () => console.log(this.state));
    }



    render() {
        // console.log(this.props);
        const { C_username, C_name, C_category, C_size, G_name, gamePresentPreviously } = this.state;


        return (
            <div>
                <h2>Update Clan</h2>
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField
                        disabled
                        id="filled-required-1"
                        label="Clan Name"
                        name="C_name"
                        defaultValue={C_name}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        disabled
                        id="filled-required-2"
                        label="Clan username"
                        name="C_username"
                        defaultValue={C_username}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <FormControl component="fieldset">
                        <FormLabel>Choose Clan Cateogry</FormLabel>
                        <RadioGroup
                            aria-label="C_category"
                            name="C_category"
                            value={C_category}
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
                    </FormControl><br /><br />
                    <FormControl component="fieldset">
                        <FormLabel>Choose Clan Game</FormLabel>
                        <RadioGroup
                            aria-label="G_name"
                            name="G_name"
                            value={G_name}
                            onChange={this.handleChange}
                        >
                            <FormControlLabel
                                disabled={
                                    gamePresentPreviously === true ? true : false
                                }
                                value="PUBG"
                                control={<Radio />}
                                label="PUBG"
                            />
                            <FormControlLabel
                                disabled={
                                    gamePresentPreviously === true ? true : false
                                }
                                value="FAUG"
                                control={<Radio />}
                                label="FAUG"
                            />
                            <FormControlLabel
                                disabled={
                                    gamePresentPreviously === true ? true : false
                                }
                                value="COD"
                                control={<Radio />}
                                label="COD"
                            />
                        </RadioGroup>
                    </FormControl><br />
                    <TextField
                        required
                        id="filled-required-3"
                        label="Clan Size"
                        name="C_size"
                        defaultValue={C_size}
                        type="number"
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
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

export default UpdateClan
