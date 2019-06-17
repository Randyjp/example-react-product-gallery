import { useEffect, useReducer } from 'react';
import * as requests from '../requests';
// import { didFilterParamsChange, getUrlParams } from '../utils/url';

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
  // categoryList,
  categoryId,
  minPrice,
  maxPrice,
  searchText
) {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    productList: [],
    // selectedCategory: 1,
    // priceFilters: {},
    // textFilter: undefined,
    isLoading: true,
  });

  // after that ...
  // if (categoryList) {
  useEffect(
    () => {
      (async () => {
        console.log('getting products');
        // const prevObject = {
        //   categoryId: state.selectedCategory,
        //   searchText: state.textFilter,
        //   ...state.priceFilters,
        // };

        // if (didFilterParamsChange(location.search, prevObject)) {
        dispatch({ type: Actions.LOADING, payload: true });
        // const { categoryId, minPrice, maxPrice, searchText } = getUrlParams(
        //   location.search
        // );
        const products = await requests.getProducts({
          categoryId,
          minPrice,
          maxPrice,
          searchText,
        });
        dispatch({ type: Actions.SET_PRODUCTS, payload: products });
        // dispatch({
        //   type: Actions.SET_PRICE_FILTER,
        //   payload: { minPrice, maxPrice },
        // });
        // dispatch({ type: Actions.SET_TEXT_FILTER, payload: searchText });
        // dispatch({ type: Actions.SET_CATEGORY, payload: categoryId });
        dispatch({ type: Actions.LOADING, payload: false });
        // }
      })();
      // }
    },
    [categoryId, minPrice, maxPrice, searchText]
  );

  return { state, dispatch };
}

export default useFetchProducts;
