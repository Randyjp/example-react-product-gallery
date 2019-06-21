import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { CategoryProvider, useCategoryState } from './categoryContext';
import { PriceFilterProvider, usePriceFilterState } from './priceFilterContext';
import useFetchProducts from '../hooks/useFetchProducts';
import {
  SearchTextProvider,
  useSearchTextState,
} from './searchTextFilterContext';
import {
  useProductState,
  ProductProvider,
  useProductDispatch,
} from './productContext';

const AppStateContext = React.createContext();
const AppDispatchContext = React.createContext();

function AppContextMixer({ children }) {
  const [isLoading, setIsLoading] = useState(true);
  const productList = useProductState();
  const setProductList = useProductDispatch();
  const searchText = useSearchTextState();
  const priceFilters = usePriceFilterState();
  const selectedCategory = useCategoryState();

  const { productList: products } = useFetchProducts(
    selectedCategory,
    priceFilters.minPrice,
    priceFilters.maxPrice,
    searchText,
    setIsLoading
  );

  setProductList(products);

  const state = {
    productList,
    searchText,
    priceFilters,
    selectedCategory,
    isLoading,
  };

  return (
    <AppStateContext.Provider value={state}>
      <AppDispatchContext.Provider value={setIsLoading}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
}

AppContextMixer.propTypes = {
  children: PropTypes.element.isRequired,
};

function AppProvider({ children }) {
  return (
    <CategoryProvider>
      <SearchTextProvider>
        <PriceFilterProvider>
          <ProductProvider>
            <AppContextMixer>{children}</AppContextMixer>
          </ProductProvider>
        </PriceFilterProvider>
      </SearchTextProvider>
    </CategoryProvider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

function useAppState() {
  const context = useContext(AppStateContext);

  if (context === undefined) {
    throw new Error(
      'useAppState must be render withing a AppProvider component'
    );
  }

  return context;
}

function useAppDispatch() {
  const context = useContext(AppDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useAppDispatch must be render withing a AppProvider component'
    );
  }

  return context;
}

export { AppProvider, useAppDispatch, useAppState };
