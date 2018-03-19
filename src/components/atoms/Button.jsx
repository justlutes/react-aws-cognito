import React from 'react';
import styled from 'styled-components';
import PropTypes from 'proptypes';

const Container = styled.button`
  display: flex;
  justify-content: center;
  color: #fff;
  align-items: center;
  padding: 10px 20px;
  background-color: hsla(36, 91%, 75%, 1);
  cursor: pointer;
  border-radius: 3px;
  text-transform: uppercase;
  &:hover {
    background-color: hsla(36, 91%, 75%, 0.75);
  }
`;

const Button = ({
  action, disabled, text, type,
}) => (
  <Container type={type} disabled={disabled} onClick={action}>
    {text}
  </Container>
);

Button.propTypes = {
  action: PropTypes.func,
  disabled: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  type: PropTypes.string,
};

Button.defaultProps = {
  action: () => {},
  type: '',
};

export default Button;
