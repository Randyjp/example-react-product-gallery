import React, { useState } from 'react';
import styled from 'styled-components';

import Card from '../Card';
import ProductModal from '../ProductModal';

const StyledCardGrid = styled.div`
  display: grid;
  grid-gap: 2.3125rem 1.75rem;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
  grid-area: content;
`;

const CardGrid = ({ cardsItems }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState();

  function handleClick(event) {
    event.preventDefault();
    const { target } = event;
    console.log(target);

    if (target.hasAttribute('href')) {
      console.log(target.dataset.id);
      setSelectedProductId(target.dataset.id);
      setShowModal(true);
    }
  }

  function closeModal() {
    setShowModal(false);
  }
  return (
    <React.Fragment>
      <StyledCardGrid onClick={handleClick}>
        {cardsItems.map(item => <Card key={item.id} item={item} />)}
      </StyledCardGrid>
      {showModal && (
        <ProductModal
          product={cardsItems[selectedProductId]}
          closeCallBack={closeModal}
        />
      )}
    </React.Fragment>
  );
};

export default CardGrid;
