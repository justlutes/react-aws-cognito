import React from 'react';
import styled from 'styled-components';
import PropTypes from 'proptypes';

const Container = styled.div`
  display: flex;
  justify-content: center;
  color: #fff;
  align-items: center;
  width: 60%;
  padding: 10px 0;
  background-color: hsla(36, 91%, 75%, 1);
  cursor: pointer;
  border-radius: 3px;
  text-transform: uppercase;
  &:hover {
    background-color: hsla(36, 91%, 75%, 0.75);
  }
`;

const Button = ({ action, text }) => (
  <Container>
    <span role="button" tabIndex="0" onClick={action}>
      {text}
    </span>
  </Container>
);

Button.propTypes = {
  action: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

export default Button;
