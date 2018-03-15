import React from 'react';
import PropTypes from 'proptypes';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

export default class Register extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
  };
  render() {
    const { onChange, action } = this.props;
    return (
      <React.Fragment>
        <h2>Register</h2>
        <Input placeholder="Username" onChange={e => onChange('username', e.target.value)} />
        <Input
          placeholder="Password"
          type="password"
          onChange={e => onChange('password', e.target.value)}
        />
        <Input placeholder="Email" type="email" onChange={e => onChange('email', e.target.value)} />
        <Input
          placeholder="Phone Number +12345551234"
          type="tel"
          onChange={e => onChange('phone_number', e.target.value)}
        />
        <Button text="Sign Up" action={action} />
      </React.Fragment>
    );
  }
}
