import React, { useEffect } from 'react';
import ReactDom from 'react-dom';
import PropTypes from 'prop-types';
import styled, { createGlobalStyle } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import FlatButton from '../FlatButton';

const GlobalStyle = createGlobalStyle`
/* removes scroll from body */
  body {
    overflow: hidden;
  }
`;

const StyledModalOverlay = styled.div`
  align-items: center;
  background-color: rgba(255, 255, 255, 0.86);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 100;
`;

const StyledModal = styled.div`
  background: ${props => props.theme.Colors.grayScale.white};
  box-shadow: ${props => props.theme.Shadows.box.modal};
  border-radius: 4px;
  display: flex;
  flex-wrap: wrap;
  padding: 1rem;
  overflow: hidden;
  overflow-y: auto;
  width: 45%;
`;

const Modal = ({ children, closeCallBack }) => {
  function noScroll() {
    window.scrollTo(0, 0);
  }

  function handleCloseModal(event) {
    event.preventDefault();
    // close modal on ESC key
    if (event.type === 'keydown' && event.keyCode === 27) {
      event.stopPropagation();
      closeCallBack();
    }
  }
  useEffect(() => {
    window.addEventListener('scroll', noScroll);
    window.addEventListener('keydown', handleCloseModal);

    return () => {
      window.removeEventListener('scroll', noScroll);
      window.removeEventListener('keydown', handleCloseModal);
    };
  });

  return ReactDom.createPortal(
    <StyledModalOverlay>
      <GlobalStyle />
      <StyledModal
        role="dialog"
        aria-labelledby="modal_title"
        aria-modal="true"
        onKeyDown={handleCloseModal}
      >
        <FlatButton onClick={closeCallBack}>
          <FontAwesomeIcon icon={faTimes} size="lg" />
        </FlatButton>
        {children()}
      </StyledModal>
    </StyledModalOverlay>,
    document.getElementById('modal-root')
  );
};

Modal.propTypes = {
  closeCallBack: PropTypes.func.isRequired,
  children: PropTypes.func.isRequired,
};

export default Modal;
