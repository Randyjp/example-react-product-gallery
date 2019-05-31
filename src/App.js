import React, {useEffect, useState} from 'react';
import {ThemeProvider} from 'styled-components';
import * as requests from './requests';
import Card from './components/Card';
import Header from './components/Header';
import Facet from './components/Facet';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import {Normalize} from 'styled-normalize';
import styled from 'styled-components';
import queryString from 'query-string';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

const StyledCardGrid = styled.div`
  display: grid;
  grid-gap: 2.3125rem 1.75rem;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
`;

function App({location}) {
  const [ProductList, setProductList] = useState({});
  const [categoryList, setCategoryList] = useState({});
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
        const products = await requests.getProducts({
          categoryId,
        });
        const product = await requests.getProduct(products[0].id);
        setProductList(products);
        setCategoryList(categories);
        console.log('Example request: categories', categories);
        console.log('Example request: products', products);
        console.log('Example request: product', product);
        // console.log(product.images.medium);
        setIsLoading(false);
      })();
    },
    [location]
  );

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Normalize />
        <GlobalStyle />
        <div className="App">
          <Header title=" amazing store" />
          {isLoading ? (
            <div>We are loading... </div>
          ) : (
            /* Make a card grid component */
            <React.Fragment>
              <Facet categories={categoryList} />
              <StyledCardGrid>
                {ProductList.map(product => (
                  <Card
                    key={product.id}
                    title={product.name}
                    price={product.price}
                    image={product.images['medium']}
                  />
                ))}
              </StyledCardGrid>
            </React.Fragment>
          )}
        </div>
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
