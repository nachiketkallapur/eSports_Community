import React  from 'react';
import Particles from "react-particles-js";
import {
    TextField,
    Button
} from '@material-ui/core';
import { withRouter } from 'react-router-dom';
import './login.styles.scss';


class Login extends React.Component {
    state = {
        username: "",
        password: "",
        res: "",
        err: false
    };

    categoriseUser = () => {
        var temp1 = this.state.username
            .slice(0, this.state.username.length - 4)
            .split("")
            .reverse()
            .join("");

        var temp2 = temp1.slice(0, 6).split("").reverse().join("");
        if (temp2 === "player") return "player";

        temp2 = temp1.slice(0, 4).split("").reverse().join("");
        if (temp2 === "clan") return "clan";

        temp2 = temp1.slice(0, 7).split("").reverse().join("");
        if (temp2 === "company") return "company";

        else return "none";
    }

    handleSubmit = (event) => {
        event.preventDefault();

        const userCategory = this.categoriseUser();
        if (userCategory === "none") {
            alert("Invalid usertype");
            return;
        }


        fetch(`http://localhost:8080/login/${userCategory}/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state),
        })
            .then(async (res) => await this.setState({ res: await res.text() }))
            .catch(async (error) => await this.setState({ res: error, err: true }))
            .finally(res => {
                console.log(this.state);
                alert(this.state.res);
                if (this.state.res === "Successful login") {
                    localStorage.setItem('currentUser',this.state.username);
                    this.props.history.push(`/dashboard`);
                }

            })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({ ...this.state, [name]: value });
    }
    render() {
        return (
            <div className='login-page'>
                <h1 className='heading'>Login Page</h1>
                <form className='login-form' onSubmit={this.handleSubmit} autoComplete="off">
                    <TextField
                        required
                        id="filled-required-1"
                        label="username"
                        name="username"
                        value={this.state.username}
                        variant="filled"
                        onChange={this.handleChange}
                        style={{ width: "350px", margin: "5px 0px" }}
                    /><br /><br />
                    <TextField
                        required
                        id="filled-required-2"
                        label="password"
                        name="password"
                        value={this.state.password}
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
                <Particles
                    className='particles'
                    height="99.5vh"
                    width="95vw"
                    params={{
                        particles: {
                            number: {
                                value: 200,
                                density: {
                                    enable: true,
                                    value_area: 1000,
                                },
                            },
                        },
                    }}
                />
            </div>
        )
    }
}

export default withRouter(Login);
