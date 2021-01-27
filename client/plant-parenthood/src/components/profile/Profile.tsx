import React from 'react';
import { Redirect } from 'react-router-dom';

class Profile extends React.Component<{}, ProfileState> {
  constructor() {
    super({});
    this.state = {
      loggedIn: false
    };
  }

  render() {
    return (
      <div>
        { this.state.loggedIn ?
            Profile :
            <Redirect to="login" /> }
      </div>
    );
  }
}

interface ProfileState {
  loggedIn: boolean;
}

export default Profile;