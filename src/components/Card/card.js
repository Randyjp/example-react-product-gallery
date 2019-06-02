import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { addPQueryParameter } from '../../utils/url';

const StyledCard = styled(Link)`
  align-items: center;
  background: ${props => props.theme.Colors.grayScale.white};
  border: ${props => props.theme.Borders.grey1px};
  box-shadow: ${props => props.theme.Shadows.box.card};
  border-radius: 0.25rem;
  color: ${props => props.theme.Colors.grayScale.black};
  display: flex;
  flex-direction: column;
  max-height: 18.25rem;
  padding: 0.5rem;
  text-decoration: none;

  h3 {
    font-size: 1.125rem;
    margin-bottom: auto;
    text-align: center;
  }

  p {
    color: ${props => props.theme.Colors.yellow.gold};
    font-size: 1.25rem;
    font-weight: 600;
  }

  img {
    margin-bottom: 1rem;
  }

  :hover,
  :active {
    border: ${props => props.theme.Borders.gold2px};
  }
`;

const Card = ({ item }) => {
  const search = addPQueryParameter(window.location, {
    productId: item.id,
  });

  return (
    <StyledCard
      to={{
        pathname: '/products',
        search,
      }}
    >
      <img src={item.images.medium} alt={item.name} />
      <h3>{item.name}</h3>
      <p>${item.price}</p>
    </StyledCard>
  );
};

Card.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    images: PropTypes.object.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
