import React from 'react';
import styled from 'styled-components';
import PropTypes from 'proptypes';

const StyledInput = styled.input`
  height: 40px;
  width: 60%;
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
