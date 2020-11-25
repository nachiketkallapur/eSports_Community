import React from 'react'

import {
    TextField,
    Button,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
} from '@material-ui/core/';

import DateFnsUtils from '@date-io/date-fns';

import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import PlayerForm from '../../components/player-form/player-form.component';
import ClanForm from '../../components/clan-form/clan-form.component';
import CompanyForm from '../../components/company-form/company-form.component';



class RegisterForm extends React.Component {

    state = {
        playerName: "",
        playerAge: "",
        playerSex: "male",
        playerCity: "",
        playerState: "",
        playerYTChannel: "",
        playerYTStartDate: new Date(),
        playerYTSubscribers: ""
    }

    handleChange = (event) => {
        const { name, value } = event.target;

        this.setState({ [name]: value }, () => console.log(this.state))
    };

    handleDateChange = (date) => {
        this.setState({ playerYTStartDate: date })
    }

    render() {
        const { userType } = this.props.match.params;

        if (userType === "player") {
            return (
                <PlayerForm />
            )
        }
        else if (userType === "clan") {
            return (
                <ClanForm />
            )
        }
        else if (userType === "company") {
            return (
                <CompanyForm />
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


}

export default RegisterForm; 
