import React from 'react';
import TextInput from '../common/TextInput';
import './LoginPage.css';

class Login extends React.Component<{}, LoginState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onUsernameChange = (value: string) => {
    this.setState({
      username: value,
    });
  }

  onPasswordChange = (value: string) => {
    this.setState({
      password: value,
    })
  }

  checkCanSubmit = (): boolean => {
    return this.state.username === '' || this.state.password === '';
  }

  render = () => {
    return (
      <div className='login-container'>
        <h1>Log in</h1>
        <TextInput
            value={this.state.username} 
            onChange={this.onUsernameChange}
            defaultValue='Username' />
        <TextInput
            value={this.state.password} 
            onChange={this.onPasswordChange}
            defaultValue='Password'
            password />
        <input type='submit' 
            value='Log in'
            className='submit'
            disabled={this.checkCanSubmit()} />
      </div>
    )
  }
}

interface LoginState {
  username: string;
  password: string;
};

export default Login;