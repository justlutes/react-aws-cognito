import React from 'react';
import styled from 'styled-components';
import PropTypes from 'proptypes';

const StyledInput = styled.input`
  height: 40px;
  margin-bottom: 10px;
  border: none;
  outline: none;
  border-bottom: 2px solid #4caf50;
  font-size: 16px;
  &::placeholder: {
    color: 'rgba(0, 0, 0, 0.3)';
  }
`;

const Input = ({ onChange, placeholder, type = 'text' }) => (
  <StyledInput placeholder={placeholder} type={type} onChange={onChange} />
);

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
};

Input.defaultProps = {
  placeholder: '',
  type: 'text',
};

export default Input;
