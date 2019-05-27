import React, {useEffect, useState} from 'react';
// import './App.css';
import {ThemeProvider} from 'styled-components';
import logo from './logo.svg';
import * as requests from './requests';
import Card from './components/Card';
import theme from './styles/theme';
import GlobalStyle from './styles/global';
import {Normalize} from 'styled-normalize';

export default function App() {
  const [newProduct, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  // Here as an example to get you started with requests.js
  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const categories = await requests.getCategories();
      const products = await requests.getProducts({
        categoryId: categories[0].id,
      });
      const product = await requests.getProduct(products[0].id);
      setProduct(product);
      console.log('Example request: categories', categories);
      console.log('Example request: products', products);
      console.log('Example request: product', product);
      // console.log(product.images.medium);
      setIsLoading(false);
    })();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <React.Fragment>
        <Normalize />
        <GlobalStyle />
        <div className="App">
          {/* <header className="App-header">
        <h2>Product Gallery Demo Project</h2>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
        Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
        >
        React Docs
        </a>
      </header> */}
          {/* {console.log(newProduct)} */}
          {isLoading ? (
            <div>We are loading... </div>
          ) : (
            <Card
              title={newProduct.name}
              price={newProduct.price}
              image={newProduct.images['medium']}
            />
          )}
        </div>
      </React.Fragment>
    </ThemeProvider>
  );
}
