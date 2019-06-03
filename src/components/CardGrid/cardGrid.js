/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Route, withRouter } from 'react-router-dom';
import queryString from 'query-string';

import Card from '../Card';
import Sorter from '../Sorter';
import ProductModal from '../ProductModal';
import { addPQueryParameter } from '../../utils/url';
import {
  sortAscending,
  sortDescending,
  alphaSort,
  alphaSortReverse,
} from '../../utils/product';

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

const StyledGridGHeader = styled.div`
  display: flex;
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.8rem;
`;
const NotFound = () => (
  <StyledNotFoundText>No products found....</StyledNotFoundText>
);

const CardGrid = React.memo(({ cardsItems, category, history, location }) => {
  const [sortedItems, setSortedItems] = useState(cardsItems);
  function closeModal() {
    const search = addPQueryParameter(location, { productId: undefined });
    if (location.search !== search) {
      history.push({ ...location, search });
    }
  }
  function handleSort(selectedOption) {
    const itemsClone = [...sortedItems];

    switch (selectedOption.value) {
      case 1:
        itemsClone.sort(sortAscending);
        setSortedItems(itemsClone);
        break;
      case 2:
        itemsClone.sort(sortDescending);
        setSortedItems(itemsClone);
        break;
      case 4:
        itemsClone.sort(alphaSortReverse);
        setSortedItems(itemsClone);
        break;
      default:
        itemsClone.sort(alphaSort);
        setSortedItems(itemsClone);
    }
  }

  return (
    <React.Fragment>
      {sortedItems.length > 0 ? (
        <StyledCardGridContainer>
          <StyledGridGHeader>
            <h2>{category.name}</h2>
            <Sorter
              filters={[
                { value: 1, label: 'Price: Low to High' },
                { value: 2, label: 'Price: High to Low' },
                { value: 3, label: 'Name: A to Z' },
                { value: 4, label: 'Name: Z to A' },
              ]}
              OnSort={handleSort}
            />
          </StyledGridGHeader>
          <StyledCardGrid>
            {sortedItems.map(item => <Card key={item.id} item={item} />)}
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
