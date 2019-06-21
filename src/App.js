import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { Normalize } from 'styled-normalize';
import { Route, Switch, Redirect } from 'react-router-dom';

import ProductGrid from './components/ProductGrid';
import Header from './components/Header';
import Facet from './components/Facet';
import Layout from './components/Layout';
import SideBar from './components/SideBar';
import PriceFilter from './components/PriceFilter';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import LoadingSpinner from './components/LoadingSpinner';
import * as requests from './requests';
import { AppProvider, useAppState } from './context/appContext';

function App() {
  const [categoryList, setCategoryList] = useState([]);
  // fetch categories
  useEffect(() => {
    (async () => {
      try {
        const categories = await requests.getCategories();
        setCategoryList(categories);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const {
    isLoading,
    productList,
    searchText,
    priceFilters,
    selectedCategory,
  } = useAppState();

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Normalize />
        <GlobalStyle />
        <Layout>
          <Header title="amazing store" searchText={searchText} />
          <SideBar title="all categories">
            <Facet categories={categoryList} />
            <PriceFilter priceFilters={priceFilters} />
          </SideBar>
          {isLoading || categoryList.length === 0 ? (
            <LoadingSpinner />
          ) : (
            <ProductGrid
              productList={productList}
              category={categoryList.find(
                category => category.id === selectedCategory
              )}
            />
          )}
        </Layout>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default () => (
  <Switch>
    <Route
      path="/products"
      render={() => (
        <AppProvider>
          <App />
        </AppProvider>
      )}
    />
    <Redirect to="/products" />
  </Switch>
);
