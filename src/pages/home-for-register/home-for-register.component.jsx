import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  makeStyles,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@material-ui/core";
import Particles from "react-particles-js";
import "./home-for-register.styles.scss";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

const HomeForRegister = ({ match, history }) => {
  // const classes = useStyles();
  const [userType, setUserType] = useState("player");

  const handleChange = (event) => {
    console.log(event.target.value);

    setUserType(event.target.value);
  };

  return (
    <div className="register">
      <h1 className="heading">Choose User Type and click Next</h1>
      <div className="registration-form">
        <FormControl component="fieldset">
          <RadioGroup
            aria-label="userType"
            name="userType"
            value={userType}
            onChange={handleChange}
          >
            <FormControlLabel
              value="player"
              control={<Radio />}
              label="Player"
            />
            <FormControlLabel
              value="clan"
              control={<Radio />}
              label="Clan"
            />
            <FormControlLabel
              value="company"
              control={<Radio />}
              label="Company"
            />
          </RadioGroup>
        </FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => history.push(`${match.url}/${userType}`)}
        >
          Next
        </Button>
      </div>

      <Particles
        height="95vh"
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
  );
};

export default HomeForRegister;
