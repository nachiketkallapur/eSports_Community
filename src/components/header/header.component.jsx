import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
// import { IconButton, Toolbar, Typography } from "@material-ui/core";
// import classes from "*.module.css";
// import { AppBar } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";


// import { Link } from 'react-router-dom';

import './header.styles.scss';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function Header() {
  const classes = useStyles();

  const [visible, setVisible] = useState(false);

  const handleHover = () => {
    setVisible((prevVisible) => (prevVisible = !prevVisible));
  };

  return (
    <div className="header">
      <AppBar position="static" inverse collapseOnSelect className="nav-bar" show={visible}>
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            eSports Community
          </Typography>
          <Button color="inherit" className="Login">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;