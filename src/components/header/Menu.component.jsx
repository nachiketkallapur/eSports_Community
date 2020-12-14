import React, { Component } from "react";
import "./Menu.styles.css";
import {Link, withRouter} from 'react-router-dom';

 
class Menu extends Component {
  handleClick=() =>{
    console.log("in handleClick");
    this.props.history.push("/");
  }

  render() {
    var visibility = "hide";
 
    if (this.props.menuVisibility) {
      visibility = "show";
    }

   console.log("In Menu Component") 
    
    return (
      <div id="flyoutMenu"
           onMouseDown={this.props.handleMouseDown} 
           className={visibility}>
        <Link to="/"><h2>Home</h2></Link>
        <h2 onClick={() =>this.handleClick()} style={{cursor:"pointer"}}>Register</h2>
        {/* <h2><Link>Login</a></h2> */}
        {/* <h2><a href="#">Search</a></h2> */}
      </div>
    );
  }s
}
 
export default withRouter(Menu);