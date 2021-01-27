import React from 'react';
import Login from './Login';
import Signup from './Signup';
import './LoginPage.css';

class LoginPage extends React.Component {
  render() {
    return (
      <div className='login-page-container'>
        <Login />
        <Signup />
      </div>
    );
  }
}

export default LoginPage;