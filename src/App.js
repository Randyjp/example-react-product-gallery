import React, {useEffect, useState} from 'react';
import {ThemeProvider} from 'styled-components';
import * as requests from './requests';
import CardGrid from './components/CardGrid';
import Header from './components/Header';
import Facet from './components/Facet';
import Layout from './components/Layout';
import SideBar from './components/SideBar';
import PriceFilter from './components/PriceFilter';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import {Normalize} from 'styled-normalize';
import styled from 'styled-components';
import queryString from 'query-string';
import {addPQueryParameter} from './utils/url';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

function App({location, history}) {
  const [ProductList, setProductList] = useState({});
  const [categoryList, setCategoryList] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // Here as an example to get you started with requests.js
  useEffect(
    () => {
      (async () => {
        setIsLoading(true);
        const qs = queryString.parse(location.search);
        console.log(qs);
        const categories = await requests.getCategories();
        const categoryId = Number.parseInt(qs.category, 10) || categories[0].id;
        const minPrice = Number.parseInt(qs.minPrice, 10);
        const maxPrice = Number.parseInt(qs.maxPrice, 10);
        const products = await requests.getProducts({
          categoryId,
          minPrice,
          maxPrice,
        });
        // const product = await requests.getProduct(products[0].id);
        setProductList(products);
        setCategoryList(categories);
        // console.log('Example request: categories', categories);
        // console.log('Example request: products', products);
        // console.log('Example request: product', product);
        // console.log(product.images.medium);
        setIsLoading(false);
      })();
    },
    [location]
  );

  function filterByPrice(priceRanges) {
    const search = addPQueryParameter(location, priceRanges);
    history.push({...location, search});
  }

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Normalize />
        <GlobalStyle />
        <Layout>
          <Header title=" amazing store" />
          {isLoading ? (
            <div>We are loading... </div>
          ) : (
            <React.Fragment>
              <SideBar title="all categories">
                <Facet categories={categoryList} />
                <PriceFilter filterCallBack={filterByPrice} />
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
