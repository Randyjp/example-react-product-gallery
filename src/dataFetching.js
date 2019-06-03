import { useEffect, useReducer } from 'react';
import * as requests from './requests';
import { didFilterParamsChange, getUrlParams } from './utils/url';

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
    case Actions.SET_CATEGORIES:
      return {
        ...state,
        categoryList: action.payload,
      };
    case Actions.SET_CATEGORY:
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case Actions.SET_PRODUCTS:
      return {
        ...state,
        productList: action.payload,
      };
    case Actions.SET_PRICE_FILTER:
      return {
        ...state,
        priceFilters: action.payload,
      };
    case Actions.SET_TEXT_FILTER:
      return {
        ...state,
        textFilter: action.payload,
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

function useRequestApi(location) {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    productList: [],
    selectedCategory: 1,
    priceFilters: {},
    textFilter: undefined,
    isLoading: true,
  });

  // fetch stuff for the first time.
  useEffect(() => {
    (async () => {
      dispatch({ type: Actions.LOADING, payload: true });
      try {
        const categories = await requests.getCategories();
        const products = await requests.getProducts({
          categoryId: categories[0].id,
        });
        dispatch({ type: Actions.SET_CATEGORIES, payload: categories });
        dispatch({ type: Actions.SET_PRODUCTS, payload: products });
      } catch (error) {
        console.log(error);
      }
      dispatch({ type: Actions.LOADING, payload: false });
    })();
  }, []);

  // after that ...
  useEffect(
    () => {
      if (state.categoryList) {
        (async () => {
          const prevObject = {
            categoryId: state.selectedCategory,
            searchText: state.textFilter,
            ...state.priceFilters,
          };

          if (didFilterParamsChange(location.search, prevObject)) {
            dispatch({ type: Actions.LOADING, payload: true });
            const { categoryId, minPrice, maxPrice, searchText } = getUrlParams(
              location.search
            );
            const products = await requests.getProducts({
              categoryId,
              minPrice,
              maxPrice,
              searchText,
            });
            dispatch({ type: Actions.SET_PRODUCTS, payload: products });
            dispatch({
              type: Actions.SET_PRICE_FILTER,
              payload: { minPrice, maxPrice },
            });
            dispatch({ type: Actions.SET_TEXT_FILTER, payload: searchText });
            dispatch({ type: Actions.SET_CATEGORY, payload: categoryId });
            dispatch({ type: Actions.LOADING, payload: false });
          }
        })();
      }
    },
    [location.search, state]
  );

  return state;
}

export default useRequestApi;
