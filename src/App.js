import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import queryString from 'query-string';
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
import { addPQueryParameter } from './utils/url';

function App({ location, history }) {
  const [ProductList, setProductList] = useState({});
  const [categoryList, setCategoryList] = useState({});
  const [priceFilters, setPriceFilters] = useState({});
  const [textFilter, setTextFilter] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  // Here as an example to get you started with requests.js
  useEffect(
    () => {
      (async () => {
        setIsLoading(true);
        const qs = queryString.parse(location.search);
        // console.log(qs);
        const categories = await requests.getCategories();
        const categoryId = Number.parseInt(qs.category, 10) || categories[0].id;
        const minPrice = Number.parseInt(qs.minPrice, 10) || '';
        const maxPrice = Number.parseInt(qs.maxPrice, 10) || '';
        const searchText = qs.searchText || '';
        console.log(searchText);
        const products = await requests.getProducts({
          categoryId,
          minPrice,
          maxPrice,
          searchText,
        });
        // const product = await requests.getProduct(products[0].id);
        setProductList(products);
        setCategoryList(categories);
        setPriceFilters({ minPrice, maxPrice });
        setTextFilter(searchText);
        console.log('Example request: products', products);
        // console.log('Example request: categories', categories);
        // console.log('Example request: product', product);
        // console.log(product.images.medium);
        setIsLoading(false);
      })();
    },
    [location]
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

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Normalize />
        <GlobalStyle />
        <Layout>
          {isLoading ? (
            <div>We are loading... </div>
          ) : (
            <React.Fragment>
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
              <CardGrid cardsItems={ProductList} />
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
