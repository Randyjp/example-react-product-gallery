import React, { useEffect, useState } from 'react';
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

function App({ location, history }) {
  const [ProductList, setProductList] = useState({});
  const [categoryList, setCategoryList] = useState();
  const [priceFilters, setPriceFilters] = useState({});
  const [textFilter, setTextFilter] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(1);
  // Here as an example to get you started with requests.js
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      try {
        const categories = await requests.getCategories();
        const products = await requests.getProducts({
          categoryId: categories[0].id,
        });
        setCategoryList(categories);
        setProductList(products);
        console.log(categories);
      } catch (error) {
        console.log(error);
      }
      setIsLoading(false);
    })();
  }, []);
  // useEffect(() => {
  //   (async () => {
  //     setIsLoading(true);
  //     try {
  //       const categories = await requests.getCategories();
  //       setCategoryList(categories);
  //       const filters = getUrlParams();
  //       console.log(filters);
  //       const products = await requestProducts(filters);
  //       // const products = await requestProducts({
  //       //   categoryId: categories[0].id,
  //       // });
  //       setPriceFilters({
  //         minPrice: filters.minPrice,
  //         maxPrice: filters.maxPrice,
  //       });
  //       setTextFilter(filters.searchText);
  //       setProductList(products);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setIsLoading(false);
  //   })();
  // }, []);
  useEffect(
    () => {
      if (categoryList) {
        (async () => {
          // const qs = queryString.parse(location.search);
          // const productId = Number.parseInt(qs.productId, 10) || -1;

          const prevObject = {
            categoryId: selectedCategory,
            searchText: textFilter,
            ...priceFilters,
          };

          if (didFilterParamsChange(location.search, prevObject)) {
            setIsLoading(true);
            const { categoryId, minPrice, maxPrice, searchText } = getUrlParams(
              location.search
            );
            const products = await requests.getProducts({
              categoryId,
              minPrice,
              maxPrice,
              searchText,
            });
            // const product = await requests.getProduct(products[0].id);
            setProductList(products);
            setPriceFilters({ minPrice, maxPrice });
            setTextFilter(searchText);
            setSelectedCategory(categoryId);
            // console.log('Example request: products', products);
            // console.log('Example request: categories', categories);
            // console.log('Example request: product', product);
            // console.log(product.images.medium);
            setIsLoading(false);
          }
        })();
      }
    },
    [location.search, categoryList, priceFilters, selectedCategory, textFilter]
  );

  // async function requestProducts(filters) {
  //   const products = await requests.getProducts(filters);
  //   return products;
  // }
  // function didFilterParamsChange(queryObject) {
  //   const prevObject = {
  //     categoryId: selectedCategory,
  //     searchText: textFilter,
  //     ...priceFilters,
  //   };

  //   const currentObject = {
  //     categoryId: queryObject.category,
  //     searchText: queryObject.searchText,
  //     minPrice: queryObject.minPrice,
  //     maxPrice: queryObject.maxPrice,
  //   };

  //   console.log(queryString.stringify(currentObject));
  //   console.log(queryString.stringify(prevObject));
  //   return (
  //     queryString.stringify(prevObject) === queryString.stringify(currentObject)
  //   );
  // }

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
                cardsItems={ProductList}
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
