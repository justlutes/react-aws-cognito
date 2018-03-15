import React, { Component } from 'react';
import { Auth } from 'aws-amplify';
import './App.css';
import Routes from './Routes';

class App extends Component {
  constructor() {
    super();
    this.state = {
      authStatus: false,
    };

    this.handleWindowClose = this.handleWindowClose.bind(this);
    this.validateUserSession = this.validateUserSession.bind(this);
  }

  componentWillMount() {
    this.validateUserSession();
    window.addEventListener('beforeunload', this.handleWindowClose);
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.handleWindowClose);
  }

  async handleWindowClose(e) {
    e.preventDefault();

    try {
      await Auth.signOut();
      sessionStorage.setItem('isLoggedIn', false);
      this.setState({ authStatus: false });
    } catch (error) {
      console.error(error);
    }
  }

  validateUserSession() {
    const checkIfLoggedIn = sessionStorage.getItem('isLoggedIn');
    console.log(checkIfLoggedIn);
    if (checkIfLoggedIn) {
      this.setState({ authStatus: true });
    } else {
      this.setState({ authStatus: false });
    }
  }

  render() {
    return (
      <div>
        <Routes authStatus={this.state.authStatus} />
      </div>
    );
  }
}

export default App;
