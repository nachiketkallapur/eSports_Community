import React, { Component } from 'react';
import {
    TextField,
    Button,
} from '@material-ui/core/';

import './update-company.styles.scss';

class UpdateCompany extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...this.props.companyData,
            message: "",
            error: false
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        const { Comp_name, Comp_username, Comp_bio, Comp_location } = this.state;

        fetch('http://localhost:8080/company/update/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ Comp_name, Comp_username, Comp_bio, Comp_location })
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

        const { Comp_name, Comp_username, Comp_bio, Comp_location } = this.state;

        return (
            <div>
                <br/>
                <h2>Update Company</h2>
                <form className='update-company-form' autoComplete="off" onSubmit={this.handleSubmit}>
                    <TextField
                        required
                        id="filled-required-1"
                        label="Company Name"
                        name="Comp_name"
                        defaultValue={Comp_name}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        disabled
                        id="filled-required-1"
                        label="Company username"
                        name="Comp_username"
                        defaultValue={Comp_username}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-1"
                        label="Company bio"
                        name="Comp_bio"
                        defaultValue={Comp_bio}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        disabled
                        id="filled-required-1"
                        label="Company Location"
                        name="Comp_location"
                        defaultValue={Comp_location}
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

export default UpdateCompany
