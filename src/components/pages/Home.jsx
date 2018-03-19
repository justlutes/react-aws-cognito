import React from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';
import { Auth } from 'aws-amplify';
import { CSSTransition } from 'react-transition-group';
import Register from '../molecules/Register';
import ConfirmRegister from '../molecules/ConfirmRegister';

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
      confirm: false,
      authSuccess: false,
    };

    this.signUp = this.signUp.bind(this);
    this.confirmSignUp = this.confirmSignUp.bind(this);
  }

  async signUp({
    username, password, email, phone_number,
  }) {
    this.setState({ username });
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
      throw error;
    }
  }

  async confirmSignUp({ authcode }) {
    try {
      await Auth.confirmSignUp(this.state.username, authcode);
      this.setState({ authSuccess: true });
    } catch (error) {
      throw error;
    }
  }

  render() {
    return (
      <Wrapper>
        <PlaceHolder />
        <RightWrapper>
          <CSSTransition timeout={1000} classNames="fade">
            {!this.state.confirm ? (
              <Register action={this.signUp} />
            ) : (
              <ConfirmRegister action={this.confirmSignUp} />
            )}
          </CSSTransition>
        </RightWrapper>
        {this.state.authSuccess && <Redirect to="/login" />}
      </Wrapper>
    );
  }
}
