import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import Modal from '../Modal';
const StyledModalContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 2rem 3rem 2rem 0;
`;

const StyledImageContainer = styled.div`
  flex: 0 1 50%;

  img {
    max-width: 100%;
    height: auto;
  }
`;
const StyledContent = styled.div`
  display: flex;
  flex-direction: column;
  flex: 0 1 50%;
  h2 {
    font-size: 28px;
    color: #373738;
    letter-spacing: 0;
    text-align: left;
  }

  span {
    font-weight: 800;
    font-size: 30px;
    color: #f8cb00;
    letter-spacing: 0;
    text-align: left;
  }
  p {
    /* font-family: SourceSansPro-Regular; */
    font-size: 16px;
    color: #585858;
    letter-spacing: 0;
    line-height: 30px;
    text-align: left;
  }
`;
const ProductModal = ({ product, closeCallBack }) => {
  return (
    <Modal
      closeCallBack={closeCallBack}
      children={() => (
        <StyledModalContainer>
          <StyledImageContainer>
            <img src={product.images.large} />
          </StyledImageContainer>
          <StyledContent>
            <h2>{product.name}</h2>
            <span>${product.price}</span>
            <p>{product.description}</p>
          </StyledContent>
        </StyledModalContainer>
      )}
    />
  );
};

export default ProductModal;
