import React, { Component } from "react";
import "./Menu.styles.css";
import {Link} from 'react-router-dom';
 
class Menu extends Component {
  render() {
    var visibility = "hide";
 
    if (this.props.menuVisibility) {
      visibility = "show";
    }
 
    return (
      <div id="flyoutMenu"
           onMouseDown={this.props.handleMouseDown} 
           className={visibility}>
        <h2><Link to="/register">Home</Link></h2>
        <h2><a href="http://localhost:3000/register/">About</a></h2>
        <h2><a href="#">Contact</a></h2>
        <h2><a href="#">Search</a></h2>
      </div>
    );
  }s
}
 
export default Menu;