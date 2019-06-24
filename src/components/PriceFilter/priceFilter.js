import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  PriceActions,
  usePriceFilterDispatch,
} from '../../context/priceFilterContext';

const StyledFilter = styled.div`
  display: flex;
  flex-direction: column;

  h3 {
    font-size: 0.875rem;
    font-weight: 600;
    text-transform: uppercase;
  }
`;

const StyledForm = styled.form`
  display: flex;

  input {
    border: ${props => props.theme.Borders.grey1px};
    border-radius: 0.125rem;
    font-size: 0.875rem;
    max-width: 4rem;
    margin-right: 0.625rem;
    text-indent: 0.5rem;
  }

  button {
    padding: 0.5rem 2.5rem;
    border-radius: 0.3125rem;
    background-color: ${props => props.theme.Colors.yellow.gold};
    border: none;
    cursor: pointer;
  }
`;

const PriceFilter = React.memo(({ priceFilters }) => {
  const setPriceFilters = usePriceFilterDispatch();
  const [inputValues, setInputsValue] = useState(priceFilters);

  function handleFilterChange(event) {
    const {
      target: { name, value },
    } = event;
    setInputsValue({ ...inputValues, [name]: value });
  }

  function handleFilterProducts(event) {
    event.preventDefault();
    const minPrice = Number.parseInt(inputValues.minPrice, 10) || undefined;
    const maxPrice = Number.parseInt(inputValues.maxPrice, 10) || undefined;

    if (minPrice && maxPrice && minPrice > maxPrice) {
      // reset all state
      setPriceFilters({
        type: PriceActions.RESET,
      });
      setInputsValue({
        minPrice: 0,
        maxPrice: 0,
      });
      // don't execute other conditions
      return;
    }
    if (inputValues.minPrice !== priceFilters.minPrice) {
      setPriceFilters({
        type: PriceActions.SET_MIN_PRICE,
        minPrice,
      });
    }
    if (inputValues.maxPrice !== priceFilters.maxPrice) {
      setPriceFilters({
        type: PriceActions.SET_MAX_PRICE,
        maxPrice,
      });
    }
  }
  return (
    <StyledFilter>
      <h3>Filter By Price</h3>
      <StyledForm onSubmit={handleFilterProducts} onBlur={handleFilterProducts}>
        <input
          type="number"
          name="minPrice"
          placeholder="$ Min"
          maxLength={8}
          min={0}
          value={inputValues.minPrice || ''}
          onChange={handleFilterChange}
        />
        <input
          type="number"
          name="maxPrice"
          placeholder="$ Max"
          maxLength={8}
          min={0}
          value={inputValues.maxPrice || ''}
          onChange={handleFilterChange}
        />
        <button type="submit">Go</button>
      </StyledForm>
    </StyledFilter>
  );
});

PriceFilter.propTypes = {
  priceFilters: PropTypes.shape({
    minPrice: PropTypes.number,
    maxPrice: PropTypes.number,
  }),
};

PriceFilter.defaultProps = {
  priceFilters: {
    minPrice: undefined,
    maxPrice: undefined,
  },
};
export default PriceFilter;
