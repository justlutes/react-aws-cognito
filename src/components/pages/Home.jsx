import React from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import { CSSTransition } from 'react-transition-group';
import Register from '../molecules/Register';
import ConfirmSignUp from '../molecules/ConfirmSignUp';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
      console.log('successful confirm');
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <CSSTransition timeout={1000} classNames="fade">
        <Wrapper>
          {!this.state.confirm ? (
            <Register onChange={this.onChange} action={this.signUp} />
          ) : (
            <ConfirmSignUp onChange={this.onChange} action={this.confirmSignUp} />
          )}
        </Wrapper>
      </CSSTransition>
    );
  }
}
