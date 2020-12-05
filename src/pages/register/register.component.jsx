import React from 'react'
import { Route, Switch } from 'react-router-dom';
import HomeForRegister from '../home-for-register/home-for-register.component';
import RegisterForm from '../register-form/register-form.component';

import Particles from "react-particles-js";

import './register.styles.scss';

function Register({ match }) {
    return (
        <div className='register-page'>
            <Particles
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
            <Switch>
                <Route exact path={`${match.path}/`} component={HomeForRegister} />
                <Route path={`${match.path}/:userType`} component={RegisterForm} />
            </Switch>
        </div>
    )
}

export default Register;
