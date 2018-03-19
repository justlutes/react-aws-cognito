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

const RegisterForm = ({
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
    <h2>Register</h2>
    <Input
      id="username"
      hasErrors={errors.username && touched.username}
      errors={errors.username}
      value={values.username}
      placeholder="Enter your username"
      label="Username"
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Input
      id="password"
      hasErrors={errors.password && touched.password}
      errors={errors.password}
      value={values.password}
      placeholder="Enter your password"
      label="Password"
      type="password"
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Input
      id="email"
      hasErrors={errors.email && touched.email}
      errors={errors.email}
      value={values.email}
      placeholder="Enter your email"
      label="Email"
      type="email"
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <Input
      id="phone_number"
      hasErrors={errors.phone_number && touched.phone_number}
      errors={errors.phone_number}
      value={values.phone_number}
      placeholder="+12345551234"
      label="Phone Number"
      type="tel"
      onChange={handleChange}
      onBlur={handleBlur}
    />
    <ButtonWrapper>
      <Button text="Reset" action={handleReset} disabled={isSubmitting} />
      <Button type="submit" text="Sign Up" disabled={isSubmitting} />
    </ButtonWrapper>
  </Form>
);

RegisterForm.propTypes = {
  values: PropTypes.object.isRequired,
  touched: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};

const Register = withFormik({
  mapPropsToValues: () => ({
    username: '',
    password: '',
    email: '',
    phone_number: '',
  }),
  validate: (values) => {
    const errors = {};
    if (!values.email) {
      errors.email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }
    if (!values.username) {
      errors.username = 'Required';
    }
    if (!values.password) {
      errors.password = 'Required';
    }
    if (!values.phone_number) {
      errors.phone_number = 'Required';
    } else if (!/^\+?[1-9]\d{1,14}$/.test(values.phone_number)) {
      errors.phone = 'Invalid phone number';
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
  displayName: 'Register',
})(RegisterForm);

export default Register;
