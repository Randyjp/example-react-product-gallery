// import React from 'react';
import styled from 'styled-components';

const FlatButton = styled.button`
  background-color: transparent;
  border: 0;
  text-decoration: underline;
  cursor: pointer;
  margin-left: auto;
  &:disabled {
    background-color: transparent;
    border: 0;
  }
  &:focus:enabled {
    background-color: ${props => props.theme.Colors.grayScale.lightgray};
    border: 0;
    box-shadow: 0 0 0 4px ${props => props.theme.Colors.grayScale.lightgray};
    outline: 2px solid ${props => props.theme.Colors.grayScale.white};
  }
  &:active:enabled {
    background-color: ${props => props.theme.Colors.grayScale.lightgray};
  }
`;

export default FlatButton;
