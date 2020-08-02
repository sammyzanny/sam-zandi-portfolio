import React from 'react';
import { NavLink } from 'react-router-dom';

const NavBar = (props) => {
  
  const style = {
    width: '100px',
    height: '80',
    padding: '12px',
    margin: '0 6px 6px',
    background: 'red',
    border: '2px solid red',
    borderRadius: '0 0 15px 15px',
    fontFamily: 'Impact, Charcoal, sans-serif',
    color: 'white',
    textAlign: 'center'
  }

  const activeStyle = {
    background: 'white',
    color: 'red',
    textDecoration: 'red wavy underline'
  }
  

  return <div className="navbar">
    <NavLink
      to="/"
      exact
      style={style}
      activeStyle={activeStyle}
    >Home </NavLink>
    <NavLink
      to={`/aboutme`}
      exact
      style={style}
      activeStyle={activeStyle}
    >About Me </NavLink>
    <NavLink
      to="/apps"
      exact
      style={style}
      activeStyle={activeStyle}
    >Apps </NavLink>
    <NavLink
      to="/research"
      exact
      style={style}
      activeStyle={activeStyle}
    >Research </NavLink>
    <NavLink
      to="/blog"
      exact
      style={style}

      activeStyle={activeStyle}
    >Blog</NavLink>
    </div>;

}

export default NavBar;
