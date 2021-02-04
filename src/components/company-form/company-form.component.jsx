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
        message:"",
        err:false
    }

    
    handleSubmit = (event) => {
        event.preventDefault();
        const temp = this.state.companyUsername.split('@');
        if(temp[temp.length-1]!=="company.com"){
            alert("Use company.com as suffix in username")
            return;
        }
        if(!(this.state.companyPassword.length >=8 && this.state.companyPassword.length <=20)){
            alert('Minimum password length is 8\nMaximum password length is 20');
            return;
        }

        fetch('http://localhost:8080/company/',{
            method:'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
        })
        .then(res => res.json())
        .then(({error,message}) => {
            if (error===true) {
                console.log("Error is true")
                alert(message);
                this.state({error,message});
                return;
            }
            else {
                alert(message);
                console.log("Error is false")

                this.state({error,message});
                localStorage.setItem('currentUser',this.state.companyUsername);
                this.props.history.push(`/updateProfile/${this.state.companyUsername}`)
            }
        })
        .catch((err) => this.setState({ message: err.message, error: true }))
           
        
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
