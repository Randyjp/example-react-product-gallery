import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { addPQueryParameter } from '../../utils/url';
import { Link } from 'react-router-dom';

const StyledCard = styled(Link)`
  align-items: center;
  background: ${props => props.theme.Colors.grayScale.white};
  color: ${props => props.theme.Colors.grayScale.black};
  border: ${props => props.theme.Borders.grey1px};
  border-radius: 0.25rem;
  box-shadow: ${props => props.theme.Shadows.box.card};
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
  max-height: 18.25rem;
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
    /* font-weight: 700; */
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

  // console.log(window.location.search);

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

// Card.propTypes = {
//   title: PropTypes.string.isRequired,
//   image: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
// };

export default Card;
