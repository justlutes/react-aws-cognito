import React from 'react';
import styled from 'styled-components';
import { Auth } from 'aws-amplify';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
      email: '',
      phone_number: '',
      authCode: '',
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
      console.log('successful');
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
      <Wrapper>
        <h2>SignUp</h2>
        <Input placeholder="Username" onChange={e => this.onChange('username', e.target.value)} />
        <Input
          placeholder="Password"
          type="password"
          onChange={e => this.onChange('password', e.target.value)}
        />
        <Input
          placeholder="Email"
          type="email"
          onChange={e => this.onChange('email', e.target.value)}
        />
        <Input
          placeholder="Phone Number"
          type="tel"
          onChange={e => this.onChange('phone_number', e.target.value)}
        />
        <Button text="Sign Up" action={this.signUp} />
        <Input
          placeholder="Authenitcation Code"
          onChange={e => this.onChange('authCode', e.target.value)}
        />
        <Button text="Confirm Sign Up" action={this.confirmSignUp} />
      </Wrapper>
    );
  }
}
