import React from 'react';
import styled from 'styled-components';
import PropTypes from 'proptypes';
import { withFormik } from 'formik';
import Input from '../atoms/Input';
import Button from '../atoms/Button';

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 60%;
`;

const LoginForm = ({
  values,
  touched,
  errors,
  isSubmitting,
  handleBlur,
  handleChange,
  handleSubmit,
  handleReset,
}) => (
  <Form onSubmit={handleSubmit}>
    <h2>Confirm SignUp</h2>
    <Input
      id="authcode"
      hasErrors={errors.authcode && touched.authcode}
      errors={errors.authcode}
      value={values.authcode}
      placeholder="Enter authentication code"
      label="Authentication code"
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <ButtonWrapper>
      <Button text="Reset" action={handleReset} disabled={isSubmitting} />
      <Button type="submit" text="Confirm Sign Up" disabled={isSubmitting} />
    </ButtonWrapper>
  </Form>
);

LoginForm.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};

const Login = withFormik({
  mapPropsToValues: () => ({
    authcode: '',
  }),
  validate: (values) => {
    const errors = {};
    if (!values.authcode) {
      errors.authcode = 'Required';
    } else if (!/^\d+$/.test(values.authcode)) {
      errors.phone = 'Invalid authentication number';
    }
    return errors;
  },
  handleSubmit: async (values, { props, setStatus, setSubmitting }) => {
    setSubmitting(true);
    try {
      await props.action(values);
      setSubmitting(false);
    } catch (error) {
      setStatus('error');
      setSubmitting(false);
    }
  },
  displayName: 'Login',
})(LoginForm);

export default Login;
