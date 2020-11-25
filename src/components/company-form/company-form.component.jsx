import React, { Component } from 'react';
import {
    TextField,
    Button,
} from '@material-ui/core/';

class CompanyForm extends Component {
    state = {
        companyName: "",
        companyLocation: "",
        companyBio: ""
    }

    handleSubmit = (event) => {
        event.preventDefault();
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value },() => console.log(this.state));
    }

    render() {

        const {
            companyName,
            companyLocation,
            companyBio
        } = this.state;
        return (
            <div>
                <h1>Register Form for Company</h1>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <TextField
                        required
                        id="filled-required"
                        label="Company Name"
                        name="companyName"
                        value={companyName}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required"
                        label="Company Location"
                        name="companyLocation"
                        value={companyLocation}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required"
                        label="Company Bio"
                        name="companyBio"
                        value={companyBio}
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

export default CompanyForm;
