import React from 'react';
import styled from 'styled-components';
import Card from '../Card';

const StyledCardGrid = styled.div`
  display: grid;
  grid-gap: 2.3125rem 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
`;

const CardGrid = ({cardsItems}) => (
  <StyledCardGrid>
    {cardsItems.map(item => (
      <Card
        key={item.id}
        title={item.name}
        price={item.price}
        image={item.images['medium']}
      />
    ))}
  </StyledCardGrid>
);

export default CardGrid;
