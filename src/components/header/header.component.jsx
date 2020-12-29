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
    flexGrow: 1,
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
  console.log(props)
  const handleSignOut = () => {
    // auth.signOut();
    localStorage.removeItem("currentUser");
    alert("Signed Out Successfully");
    props.history.push("/")

  }

  const currentUser = localStorage.getItem("currentUser");

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ background: 'transparent', boxShadow: 'none' }}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
            style={{ color: props.location.pathname === "/dashboard" ? "black" : "white" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography style={{ cursor: "pointer", color: props.location.pathname === "/dashboard" ? "black" : "white" }} onClick={() => props.history.push("/")} className={classes.title} variant="h6" noWrap>
            eSports Community
          </Typography>

          {
            currentUser ?
              <Typography
                style={{
                  position: "relative",
                  left: "5%",
                  cursor:"pointer",
                  color: props.location.pathname === "/dashboard" ? "black" : "white"
                }}
                onClick={() => props.history.push(`/updateProfile/${currentUser}`)}>
                Welcome {currentUser}
              </Typography> :
              <></>
          }
          {
            currentUser ?
              <div style={{ position: "absolute", right: "1%", display: "flex", flexDirection: "row" }}>
                <Link to='/dashboard' style={{ cursor: "pointer", padding: "15px", color: props.location.pathname === "/dashboard" ? "black" : "white" }}>DASHBOARD</Link>

                <div onClick={handleSignOut} style={{ cursor: "pointer", padding: "15px", color: props.location.pathname === "/dashboard" ? "black" : "white" }}>SIGN OUT</div>
              </div>
              :
              <div style={{ position: "absolute", right: "1%", display: "flex", flexDirection: "row" }}>
                <Link to='/login' style={{ cursor: "pointer", padding: "15px", color: props.location.pathname === "/dashboard" ? "black" : "white" }}>SIGN IN</Link>
              </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}

export default withRouter(Header);
