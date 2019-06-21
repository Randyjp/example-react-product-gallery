import { useEffect, useReducer } from 'react';
import * as requests from '../requests';

const Actions = Object.freeze({
  LOADING: 'LOADING',
  SET_CATEGORY: 'SET_CATEGORY',
  SET_CATEGORIES: 'SET_CATEGORIES',
  SET_PRODUCTS: 'SET_PRODUCTS',
  SET_PRICE_FILTER: 'SET_PRICE_FILTER',
  SET_TEXT_FILTER: 'SET_TEXT_FILTER',
});

const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case Actions.SET_PRODUCTS:
      return {
        ...state,
        productList: action.payload,
      };
    case Actions.LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

function useFetchProducts(
  categoryId,
  minPrice,
  maxPrice,
  searchText,
  setIsLoading
) {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    productList: [],
  });

  useEffect(
    () => {
      (async () => {
        setIsLoading(true);
        console.log('getting products');
        const products = await requests.getProducts({
          categoryId,
          minPrice,
          maxPrice,
          searchText,
        });
        dispatch({ type: Actions.SET_PRODUCTS, payload: products });
        setIsLoading(false);
      })();
      // }
    },
    [categoryId, minPrice, maxPrice, searchText]
  );

  return state;
}

export default useFetchProducts;
