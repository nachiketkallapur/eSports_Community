import React, { useState } from 'react';
import Particles from "react-particles-js";
import {
    TextField,
    Button
} from '@material-ui/core';
import './login.styles.scss';


function Login() {
    const [state, setState] = useState({
        username:"",
        password:""
    });

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(state);
    }

    const handleChange = (event) => {
        const { name, value} = event.target;
        setState({...state, [name]:value});
    }

    return (
        <div className='login-page'>
            <h1 className='heading'>Login Page</h1>
            <form className='login-form' onSubmit={handleSubmit} autoComplete="off">
                <TextField
                    required
                    id="filled-required"
                    label="username"
                    name="username"
                    value={state.username}
                    variant="filled"
                    onChange={handleChange}
                    style={{ width: "350px", margin: "5px 0px" }}
                /><br /><br />
                <TextField
                    required
                    id="filled-required"
                    label="password"
                    name="password"
                    value={state.password}
                    type="password"
                    variant="filled"
                    onChange={handleChange}
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

export default Login;
