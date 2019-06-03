/* eslint-disable react/forbid-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

import CardGrid from './components/CardGrid';
import Header from './components/Header';
import Facet from './components/Facet';
import Layout from './components/Layout';
import SideBar from './components/SideBar';
import PriceFilter from './components/PriceFilter';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import LoadingSpinner from './components/LoadingSpinner';
import useRequestApi from './dataFetching';
import { addPQueryParameter } from './utils/url';

function App({ location, history }) {
  const state = useRequestApi(location);

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

App.propTypes = {
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
};
