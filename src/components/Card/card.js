import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledCard = styled.a`
  align-items: center;
  background: ${props => props.theme.Colors.grayScale.white};
  border: ${props => props.theme.Borders.grey1px};
  border-radius: 0.25rem;
  box-shadow: ${props => props.theme.Shadows.box.card};
  display: flex;
  flex-direction: column;
  /* max-width: 200px; */

  h3 {
    font-size: 1.125rem;
    text-align: center;
  }

  p {
    color: ${props => props.theme.Colors.yellow.gold};
    font-size: 1.25rem;
    font-weight: 600;
    /* font-weight: 700; */
  }

  :hover,
  :active {
    border: ${props => props.theme.Borders.gold2px};
  }
`;

const Card = ({title, price, image}) => (
  <StyledCard>
    <img src={image} alt={title} />
    <h3>{title}</h3>
    <p>${price}</p>
  </StyledCard>
);

Card.propTypes = {
  title: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
};

export default Card;
