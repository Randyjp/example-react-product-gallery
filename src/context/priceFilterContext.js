import React, { useReducer, useContext } from 'react';
import PropTypes from 'prop-types';

const PriceStateContext = React.createContext();
const PriceDispatchContext = React.createContext();

const PriceActions = Object.freeze({
  SET_MAX_PRICE: 'SET_MAX_PRICE',
  SET_MIN_PRICE: 'SET_MIN_PRICE',
  RESET: 'RESET',
});

function priceFilterReducer(state, action) {
  switch (action.type) {
    case 'SET_MAX_PRICE':
      return {
        ...state,
        maxPrice: action.maxPrice,
      };
    case 'SET_MIN_PRICE':
      return {
        ...state,
        minPrice: action.minPrice,
      };
    case 'RESET':
      return {
        minPrice: undefined,
        maxPrice: undefined,
      };
    default:
      throw new Error(`unrecognized action type: ${action.type}`);
  }
}

function PriceFilterProvider({ children }) {
  const [state, setPriceFilter] = useReducer(priceFilterReducer, {});

  return (
    <PriceStateContext.Provider value={state}>
      <PriceDispatchContext.Provider value={setPriceFilter}>
        {children}
      </PriceDispatchContext.Provider>
    </PriceStateContext.Provider>
  );
}

PriceFilterProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

function usePriceFilterState() {
  const context = useContext(PriceStateContext);

  if (context === undefined) {
    throw new Error(
      'usePriceFilterState must be render withing a PriceFilterProvider component'
    );
  }

  return context;
}

function usePriceFilterDispatch() {
  const context = useContext(PriceDispatchContext);

  if (context === undefined) {
    throw new Error(
      'usePriceFilterDispatch must be render withing a PriceFilterProvider component'
    );
  }

  return context;
}

export {
  PriceFilterProvider,
  usePriceFilterDispatch,
  usePriceFilterState,
  PriceActions,
};
