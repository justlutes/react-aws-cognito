import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { CSSTransition } from 'react-transition-group';
import Register from '../molecules/Register';
import ConfirmSignUp from '../molecules/ConfirmSignUp';

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

export default class Home extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
      phone_number: '',
      authCode: '',
      confirm: false,
      authSuccess: false,
    };

    this.onChange = this.onChange.bind(this);
    this.signUp = this.signUp.bind(this);
    this.confirmSignUp = this.confirmSignUp.bind(this);
  }

  onChange(key, value) {
    this.setState({ [key]: value });
  }

  async signUp() {
    const {
      username, password, email, phone_number,
    } = this.state;

    try {
      await Auth.signUp({
        username,
        password,
        attributes: {
          email,
          phone_number,
        },
      });
      this.setState({ confirm: true });
    } catch (error) {
      console.error('Error sigining up', error);
    }
  }

  async confirmSignUp() {
    try {
      await Auth.confirmSignUp(this.state.username, this.state.authCode);
      this.setState({ authSuccess: true });
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <CSSTransition timeout={1000} classNames="fade">
        <Wrapper>
          <PlaceHolder />
          <RightWrapper>
            {!this.state.confirm ? (
              <Register onChange={this.onChange} action={this.signUp} />
            ) : (
              <ConfirmSignUp onChange={this.onChange} action={this.confirmSignUp} />
            )}
          </RightWrapper>
          {this.state.authSuccess && <Redirect to="/login" />}
        </Wrapper>
      </CSSTransition>
    );
  }
}
