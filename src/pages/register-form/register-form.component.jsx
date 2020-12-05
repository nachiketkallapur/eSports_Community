import React from 'react'

import PlayerForm from '../../components/player-form/player-form.component';
import ClanForm from '../../components/clan-form/clan-form.component';
import CompanyForm from '../../components/company-form/company-form.component';

import './register-form.styles.scss'


function RegisterForm(props) {

    const { userType } = props.match.params;

    if (userType === "player") {
        return (
            <div className='register-form'>
                <PlayerForm />
            </div>
        )
    }
    else if (userType === "clan") {
        return (
            <div className='register-form'>
                <ClanForm />
            </div>
        )
    }
    else if (userType === "company") {
        return (
            <div className='register-form'>
                <CompanyForm />
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Couldn't identify user</h1>
            </div>
        )
    }
}

export default RegisterForm; 
