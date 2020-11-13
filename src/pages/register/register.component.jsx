import React from 'react'
import {Route,Switch} from 'react-router-dom';
import HomeForRegister from '../home-for-register/home-for-register.component';
import RegisterForm from '../register-form/register-form.component';

function Register({match}) {
    return (
        <div>
            <Switch>
                <Route exact path={`${match.path}/`} component={HomeForRegister} />
                <Route path={`${match.path}/:userType`} component={RegisterForm} />
            </Switch>
        </div>
    )
}

export default Register;
