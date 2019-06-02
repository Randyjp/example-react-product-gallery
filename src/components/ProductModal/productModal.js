import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Modal from '../Modal';

const StyledModalContainer = styled.div`
  align-items: center;
  display: flex;
  padding: 2rem 3rem 2rem 0;
`;

const StyledImageContainer = styled.div`
  flex: 0 1 50%;
  img {
    height: auto;
    max-width: 100%;
  }
`;

const StyledContent = styled.div`
  display: flex;
  flex: 0 1 50%;
  flex-direction: column;

  h2 {
    color: ${props => props.theme.Colors.grayScale.darkGray};
    font-size: 1.75rem;
    letter-spacing: 0;
    text-align: left;
  }

  span {
    color: ${props => props.theme.Colors.yellow.gold};
    font-size: 1.875rem;
    font-weight: 800;
    letter-spacing: 0;
    text-align: left;
  }
  p {
    color: ${props => props.theme.Colors.grayScale.darkGray2};
    font-size: 1rem;
    letter-spacing: 0;
    line-height: 1.875rem;
    text-align: left;
  }
`;
const ProductModal = ({ product, closeCallBack }) => {
  return (
    <Modal closeCallBack={closeCallBack}>
      {() => (
        <StyledModalContainer>
          <StyledImageContainer>
            <img src={product.images.large} alt={product.name} />
          </StyledImageContainer>
          <StyledContent>
            <h2 id="modal_title">{product.name}</h2>
            <span>${product.price}</span>
            <p>{product.description}</p>
          </StyledContent>
        </StyledModalContainer>
      )}
    </Modal>
  );
};

ProductModal.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
  }).isRequired,
  closeCallBack: PropTypes.func.isRequired,
};
export default ProductModal;
