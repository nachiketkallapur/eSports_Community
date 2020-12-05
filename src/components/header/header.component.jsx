import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
// import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


import { Link } from 'react-router-dom';

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

  return (
    <div className="header">
      <AppBar position="static">
        <Toolbar className='toolbar'>
          <Link to="/register" color="inherit">Register</Link>
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default Header;