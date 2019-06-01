import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const StyledModalOverlay = styled.div`
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.86);
  z-index: 100;
  justify-content: center;
  align-items: center;
`;

const StyledModal = styled.div`
  background: ${props => props.theme.Colors.grayScale.white};
  box-shadow: 0 16px 34px 7px rgba(121, 121, 121, 0.1);
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  /* width: 860px; */
  /* height: 533px; */
  width: 45%;
  padding: 1rem;
  overflow: hidden;
  overflow-y: auto;
`;

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

const Modal = ({ children, closeCallBack }) => {
  // const modalRoot =
  // const element = document.createElement('div');
  // useEffect(() => {
  //   modalRoot.appendChild(element);

  //   return () => modalRoot.removeChild(element);
  // });

  return ReactDom.createPortal(
    <StyledModalOverlay>
      <StyledModal>
        <FlatButton onClick={closeCallBack}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </FlatButton>
        {children()}
      </StyledModal>
    </StyledModalOverlay>,
    document.getElementById('modal-root')
  );
};

export default Modal;
