import React, { useEffect, useReducer } from 'react';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import * as requests from './requests';
import CardGrid from './components/CardGrid';
import Header from './components/Header';
import Facet from './components/Facet';
import Layout from './components/Layout';
import SideBar from './components/SideBar';
import PriceFilter from './components/PriceFilter';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import LoadingSpinner from './components/LoadingSpinner';
import {
  addPQueryParameter,
  didFilterParamsChange,
  requestProducts,
  getUrlParams,
} from './utils/url';

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

function App({ location, history }) {
  const [state, dispatch] = useReducer(dataFetchReducer, {
    productList: [],
    selectedCategory: 1,
    priceFilters: {},
    textFilter: undefined,
    isLoading: true,
  });
  // Here as an example to get you started with requests.js
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

        // setCategoryList(categories);
        // setProductList(products);
        console.log(categories);
      } catch (error) {
        console.log(error);
      }
      // setIsLoading(false);
      dispatch({ type: Actions.LOADING, payload: false });
    })();
  }, []);

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

            // console.log('Example request: products', products);
            // console.log('Example request: categories', categories);
            // console.log('Example request: product', product);
            // console.log(product.images.medium);
            dispatch({ type: Actions.LOADING, payload: false });
          }
        })();
      }
    },
    [location.search, state]
  );

  function filterByPrice(priceRanges) {
    const search = addPQueryParameter(location, priceRanges);
    if (location.search !== search) {
      history.push({ ...location, search });
    }
  }

  function filterByText(searchText) {
    const search = addPQueryParameter(location, { searchText });
    if (location.search !== search) {
      history.push({ ...location, search });
    }
  }

  const {
    textFilter,
    categoryList,
    isLoading,
    productList,
    selectedCategory,
    priceFilters,
  } = state;

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Normalize />
        <GlobalStyle />
        <Layout>
          <Header
            title=" amazing store"
            filterCallBack={filterByText}
            defaultText={textFilter}
          />
          <SideBar title="all categories">
            <Facet categories={categoryList} />
            <PriceFilter
              filterCallBack={filterByPrice}
              defaultFilters={priceFilters}
            />
          </SideBar>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <React.Fragment>
              <CardGrid
                cardsItems={productList}
                category={categoryList.find(
                  category => category.id === selectedCategory
                )}
              />
            </React.Fragment>
          )}
        </Layout>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default () => (
  <Router>
    <Switch>
      <Route path="/products" component={App} />
      <Redirect to="/products" />
    </Switch>
  </Router>
);
