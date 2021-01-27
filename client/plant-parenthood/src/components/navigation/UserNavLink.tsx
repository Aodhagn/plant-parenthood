import React from 'react';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

class UserNavLink extends React.Component {
  render() {
    return (
      <NavLink to='/profile' className='user-nav-link'>Log in</NavLink>
    );
  }
}

export default UserNavLink;