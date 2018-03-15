import React from 'react';
import styled from 'styled-components';
import PropTypes from 'proptypes';

const Container = styled.div`
  width: 170px;
  padding: 10px 0;
  background-color: #ddd;
  cursor: pointer;
  border-radius: 3px;
  &:hover: {
    background-color: #ededed;
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
