import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { CategoryProvider, useCategoryState } from './categoryContext';
import {
  SearchTextProvider,
  useSearchTextState,
} from './searchTextFilterContext';
import { PriceFilterProvider, usePriceFilterState } from './priceFilterContext';
import useFetchProducts from '../hooks/useFetchProducts';

const ProductStateContext = React.createContext();
const ProductDispatchContext = React.createContext();

function ProductContextMixer({ children }) {
  const [productList, setProductList] = useState([]);
  const searchText = useSearchTextState();
  const priceFilters = usePriceFilterState();
  const selectedCategory = useCategoryState();

  const { state: productState } = useFetchProducts(
    selectedCategory,
    priceFilters.minPrice,
    priceFilters.maxPrice,
    searchText
  );

  const state = {
    productList: productState.productList,
    searchText,
    priceFilters,
    selectedCategory,
    isLoading: productState.isLoading,
  };

  return (
    <ProductStateContext.Provider value={state}>
      <ProductDispatchContext.Provider value={setProductList}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductStateContext.Provider>
  );
}

ProductContextMixer.propTypes = {
  children: PropTypes.element.isRequired,
};

function ProductProvider({ children }) {
  return (
    <CategoryProvider>
      <SearchTextProvider>
        <PriceFilterProvider>
          <ProductContextMixer>{children}</ProductContextMixer>
        </PriceFilterProvider>
      </SearchTextProvider>
    </CategoryProvider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

function useProductState() {
  const context = useContext(ProductStateContext);

  if (context === undefined) {
    throw new Error(
      'useProductListState must be render withing a ProductProvider component'
    );
  }

  return context;
}

function useProductListDispatch() {
  const context = useContext(ProductDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useProductListDispatch must be render withing a ProductProvider component'
    );
  }

  return context;
}

export { ProductProvider, useProductListDispatch, useProductState };
