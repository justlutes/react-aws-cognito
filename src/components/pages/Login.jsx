import React from 'react';
import styled from 'styled-components';
import { Link, Redirect } from 'react-router-dom';
import { CSSTransition } from 'react-transition-group';
import { Auth } from 'aws-amplify';
import Login from '../molecules/Login';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  background-color: hsla(203, 56%, 32%, 1);
  width: 60%;
  height: 100vh;
`;

const PlaceHolder = styled.div`
  width: 40%;
  height: 100vh;
`;

export default class LoginPage extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      enableResend: false,
      enterMFA: false,
      loggedIn: false,
      cognitoUser: '',
    };

    this.loginUser = this.loginUser.bind(this);
    this.sendVerification = this.sendVerification.bind(this);
    this.countDownResendVerficationCode = this.countDownResendVerficationCode.bind(this);
  }

  countDownResendVerficationCode() {
    let counter = 10;
    const seconds = setInterval(() => {
      if (counter === 0) {
        clearInterval(seconds);
        this.setState({ enableResend: true });
      }
      counter -= 1;
    }, 1000);
  }

  async loginUser({ username, password }) {
    try {
      const cognitoUser = await Auth.signIn(username, password);
      if (!this.state.enableResend) {
        this.countDownResendVerficationCode();
      }
      this.setState({ enterMFA: true, cognitoUser });
    } catch (error) {
      throw error;
    }
  }

  async sendVerification({ code }) {
    try {
      await Auth.confirmSignIn(this.state.cognitoUser, code);
      sessionStorage.setItem('isLoggedIn', true);
      this.setState({ loggedIn: true });
    } catch (error) {
      throw error;
    }
  }

  render() {
    if (this.state.loggedIn) {
      return <Redirect to="/dashboard" />;
    }
    return (
      <Wrapper>
        <PlaceHolder />
        <RightWrapper>
          <CSSTransition timeout={1000} classNames="fade">
            {this.state.enterMFA ? <div>Soon</div> : <Login action={this.loginUser} />}
          </CSSTransition>
          <Link to="/forgot">Forgot Password</Link>
        </RightWrapper>
      </Wrapper>
    );
  }
}
