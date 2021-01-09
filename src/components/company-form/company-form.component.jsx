import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
import {
    TextField,
    Button,
} from '@material-ui/core/';

class CompanyForm extends Component {
    state = {
        companyName: "",
        companyLocation: "",
        companyBio: "",
        companyUsername:"",
        companyPassword:"",
        res:"",
        err:false
    }

    
    handleSubmit = (event) => {
        event.preventDefault();
        const temp = this.state.companyUsername.split('@');
        if(temp[temp.length-1]!=="company.com"){
            alert("Use company.com as suffix in username")
            return;
        }

        fetch('http://localhost:8080/company/',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
        })
        .then(async (res) => this.setState({ res: await res.text() }))
            .catch(async (err) => this.setState({ res: await err.message, err: true }))
            .finally(res => {
                if (this.state.err) {
                    return alert(this.state.res);
                }
                else {
                    alert(this.state.res);
                    localStorage.setItem('currentUser',this.state.companyUsername);
                    this.props.history.push(`/updateProfile/${this.state.companyUsername}`)
                }
            })
        
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value },() => console.log(this.state));
    }

    render() {

        const {
            companyName,
            companyLocation,
            companyBio,
            companyUsername,
            companyPassword
        } = this.state;
        return (
            <div>
                <h1>Register Form for Company</h1>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                    <TextField
                        required
                        id="filled-required-1"
                        label="Company Name"
                        name="companyName"
                        value={companyName}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-2"
                        label="Company Location"
                        name="companyLocation"
                        value={companyLocation}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-3"
                        label="Company Bio"
                        name="companyBio"
                        value={companyBio}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-4"
                        label="Company Username"
                        name="companyUsername"
                        value={companyUsername}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br />
                    <TextField
                        required
                        id="filled-required-5"
                        label="Company Password"
                        name="companyPassword"
                        value={companyPassword}
                        type="password"
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

export default withRouter(CompanyForm);
