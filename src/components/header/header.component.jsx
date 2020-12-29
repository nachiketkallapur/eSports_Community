import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuIcon from '@material-ui/icons/Menu';
import { Link, withRouter } from 'react-router-dom';

import './header.styles.scss'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow:1,
    height: "0px",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  }
}));

function Header(props) {
  const classes = useStyles();

  const handleSignOut = () => {
    // auth.signOut();
    localStorage.removeItem("currentUserEmail");
    alert("Signed Out Successfully");
    props.history.push("/")

  }

  
  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{cursor:"pointer"}} onClick={() => props.history.push("/")} className={classes.title} variant="h6" noWrap>
            eSports Community
          </Typography>
          
            {
              localStorage.getItem("currentUser") ?
              <Typography style={{position:"relative", left:"5%"}}>
                Welcome {localStorage.getItem("currentUser")}
              </Typography>:
              <></>
            }
          {
            localStorage.getItem("currentUser") ?
              <div style={{position:"absolute",right:"1%",display:"flex", flexDirection:"row"}}>
                <Link to='/dashboard' style={{  cursor: "pointer", padding: "15px", color: "white" }}>DASHBOARD</Link>
          
                <div onClick={handleSignOut} style={{  cursor: "pointer", padding: "15px", color: "white" }}>SIGN OUT</div>
              </div>
              :
              <div style={{position:"absolute",right:"1%",display:"flex", flexDirection:"row"}}>
                <Link to='/login' style={{  cursor: "pointer", padding: "15px", color: "white" }}>SIGN IN</Link>
              </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);
