import React from 'react';
import PropTypes from 'proptypes';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

export default class ComfirmSignUp extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
  };
  render() {
    const { onChange, action } = this.props;
    return (
      <React.Fragment>
        <h2>Confirm SignUp</h2>
        <Input
          placeholder="Authenitcation Code"
          onChange={e => onChange('authCode', e.target.value)}
        />
        <Button text="Confirm Sign Up" action={action} />
      </React.Fragment>
    );
  }
}
