import React from 'react';
import TextInput from '../common/TextInput';
import './LoginPage.css';

class Signup extends React.Component<{}, SignupState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      username: '',
      displayName: '',
      password1: '',
      password2: '',
    }
  }

  onInputChange = (propertyName: keyof SignupState, value: string) => {
    console.log(`Changing ${propertyName} to ${value}`);
    this.setState((prevState: SignupState): SignupState => ({
      ...prevState,
      [propertyName]: value
    }));
  }

  onUsernameChange = (value: string) => {
    this.setState({
      username: value,
    });
  }

  onDisplayNameChange = (value: string) => {
    this.setState({
      displayName: value,
    })
  }

  checkCanSubmit = () => {
    return this.state.username === ''
        || this.state.displayName === ''
        || this.state.password1 !== this.state.password2
  }

  render = () => {
    return (
      <div className='login-container'>
        <h1>Sign up</h1>
        <TextInput 
            value={this.state.username}
            onChange={this.onInputChange.bind(this, 'username')}
            defaultValue='Username' />
        <TextInput 
            value={this.state.displayName}
            onChange={this.onInputChange.bind(this, 'displayName')}
            defaultValue='Display name' />
        <TextInput 
            value={this.state.password1}
            onChange={this.onInputChange.bind(this, 'password1')}
            defaultValue='Password'
            password />
        <TextInput 
            value={this.state.password2}
            onChange={this.onInputChange.bind(this, 'password2')}
            defaultValue='Re-type password'
            password />
        <input type='submit'
            value='Sign up'
            disabled={this.checkCanSubmit()} />
      </div>
    );
  }
}

export interface SignupState {
  username: string;
  displayName: string;
  password1: string;
  password2: string;
}

export default Signup;