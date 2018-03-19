import React from 'react';
import styled from 'styled-components';
import PropTypes from 'proptypes';

const StyledInput = styled.input`
  height: 40px;
  width: 100%;
  margin-bottom: 10px;
  border-radius: 3px;
  border: none;
  outline: none;
  border-bottom: 2px solid hsla(36, 91%, 75%, 1);
  font-size: 16px;
  padding: 0px 10px;
  &::placeholder: {
    color: hsla(0, 0%, 91%, 1);
  }
`;

const Errors = styled.span`
  color: red;
  font-size: 12px;
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 60%;
`;

const Input = ({
  errors,
  hasErrors,
  id,
  value,
  label,
  onBlur,
  onChange,
  placeholder,
  type = 'text',
}) => (
  <Wrapper>
    {/* eslint-disable-next-line */}
    <label htmlFor={id}>{label}</label>
    <StyledInput
      id={id}
      value={value}
      onBlur={onBlur}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
    />
    {hasErrors && <Errors>{errors}</Errors>}
  </Wrapper>
);

Input.propTypes = {
  errors: PropTypes.string,
  hasErrors: PropTypes.bool,
  id: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  onBlur: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  errors: '',
  hasErrors: false,
  placeholder: '',
  type: 'text',
};

export default Input;
