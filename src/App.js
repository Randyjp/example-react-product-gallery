/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
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
// import { addPQueryParameter } from './utils/url';
import * as requests from './requests';
// import { CategoryProvider } from './context/categoryContext';
// import { PriceFilterProvider } from './context/priceFilterContext';
// import { SearchTextProvider } from './context/searchTextFilterContext';
import { ProductProvider, useProductState } from './context/productContext';
// import { SearchTextProvider } from './hooks/searchTextFilterContext';

function App() {
  const [categoryList, setCategoryList] = useState([]);
  // const [isLoading, setIsLoading] = useState(true);
  const {
    isLoading,
    productList,
    searchText,
    priceFilters,
    selectedCategory,
  } = useProductState();
  // const { state, dispatch } = useFetchProducts(location, categoryList);

  // fetch categories
  useEffect(() => {
    (async () => {
      // dispatch({ type: 'LOADING', payload: true });
      // setIsLoading(true);
      try {
        console.log('getting categorie');
        const categories = await requests.getCategories();
        // dispatch({ type: Actions.SET_CATEGORIES, payload: categories });
        setCategoryList(categories);
        console.log(categories);
        // setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
      // setIsLoading(false);
      // dispatch({ type: 'LOADING', payload: false });
    })();
  }, []);

  // function filterByPrice(priceRanges) {
  //   const search = addPQueryParameter(location, priceRanges);
  //   if (location.search !== search) {
  //     history.push({ ...location, search });
  //   }
  // }

  // function filterByText(searchText) {
  //   const search = addPQueryParameter(location, { searchText });
  //   if (location.search !== search) {
  //     history.push({ ...location, search });
  //   }
  // }

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Normalize />
        <GlobalStyle />
        <Layout>
          {/* <SearchTextProvider> */}
          <Header title="amazing store" searchText={searchText} />
          {/* </SearchTextProvider> */}
          <SideBar title="all categories">
            {/* <CategoryProvider> */}
            <Facet categories={categoryList} />
            {/* </CategoryProvider> */}
            {/* <PriceFilterProvider> */}
            <PriceFilter
              priceFilters={priceFilters}
              // filterCallBack={filterByPrice}
              // defaultFilters={priceFilters}
            />
            {/* </PriceFilterProvider> */}
          </SideBar>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            // <ProductProvider>
            <ProductGrid
              productList={productList}
              // cardsItems={productList}
              // categoryList={categoryList}
              // setIsLoading={setIsLoading}
              category={categoryList.find(
                category => category.id === selectedCategory
              )}
            />
            // </ProductProvider>
          )}
        </Layout>
      </React.Fragment>
    </ThemeProvider>
  );
}

export default () => (
  <Switch>
    {/* <Route path="/products" component={App} /> */}
    <Route
      path="/products"
      render={() => (
        <ProductProvider>
          <App />
        </ProductProvider>
      )}
    />
    <Redirect to="/products" />
  </Switch>
);

// App.propTypes = {
//   history: PropTypes.object.isRequired,
//   location: PropTypes.object.isRequired,
// };
