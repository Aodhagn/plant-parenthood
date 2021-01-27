import React from 'react';
import { NavLink } from 'react-router-dom';
import UserNavLink from './UserNavLink';
import './NavBar.css';

class NavBar extends React.Component {
  render() {
    return (
      <div className='nav-bar'>
        <NavLink exact to='/' className='title-nav-link'>Plant Parenthood</NavLink>
        <UserNavLink />
      </div>
    );
  }
}

export default NavBar;
