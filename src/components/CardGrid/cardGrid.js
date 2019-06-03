/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Card from '../Card';
import ProductModal from '../ProductModal';
import { addPQueryParameter } from '../../utils/url';

const StyledCardGridContainer = styled.div`
  grid-area: content;
`;

const StyledCardGrid = styled.div`
  display: grid;
  grid-gap: 2.3125rem 1.75rem;
  grid-template-columns: repeat(auto-fill, minmax(12rem, 1fr));
`;

const StyledNotFoundText = styled.p`
  font-size: 3.5rem;
  grid-area: content;
  text-align: center;
  text-transform: capitalize;
`;

const NotFound = () => (
  <StyledNotFoundText>No products found....</StyledNotFoundText>
);

const CardGrid = React.memo(({ cardsItems, category, history, location }) => {
  function closeModal() {
    const search = addPQueryParameter(location, { productId: undefined });
    if (location.search !== search) {
      history.push({ ...location, search });
    }
  }
  return (
    <React.Fragment>
      {cardsItems.length > 0 ? (
        <StyledCardGridContainer>
          <h2>{category.name}</h2>
          <StyledCardGrid>
            {cardsItems.map(item => <Card key={item.id} item={item} />)}
          </StyledCardGrid>
        </StyledCardGridContainer>
      ) : (
        <NotFound />
      )}
      <Route
        path="/products"
        render={() => {
          const qs = queryString.parse(location.search);
          const productId = Number.parseInt(qs.productId, 10) || undefined;
          return (
            productId && (
              <ProductModal
                closeCallBack={closeModal}
                product={cardsItems.find(item => item.id === productId)}
              />
            )
          );
        }}
      />
    </React.Fragment>
  );
});

CardGrid.propTypes = {
  category: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  cardsItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      images: PropTypes.object.isRequired,
    })
  ).isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};

export default withRouter(CardGrid);
