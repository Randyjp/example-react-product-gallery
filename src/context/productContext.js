import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';
// import useFetchProducts from '../hooks/useFetchProducts';

const ProductStateContext = React.createContext();
const ProductDispatchContext = React.createContext();

function ProductProvider({ children }) {
  // const state = useFetchProducts();
  const [productList, setProductList] = useState([]);

  return (
    <ProductStateContext.Provider value={productList}>
      <ProductDispatchContext.Provider value={setProductList}>
        {children}
      </ProductDispatchContext.Provider>
    </ProductStateContext.Provider>
  );
}

ProductProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

function useProductState() {
  const context = useContext(ProductStateContext);

  if (context === undefined) {
    throw new Error(
      'useProductState must be render withing a ProductProvider component'
    );
  }

  return context;
}

function useProductDispatch() {
  const context = useContext(ProductDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useProductDispatch must be render withing a ProductProvider component'
    );
  }

  return context;
}

export { ProductProvider, useProductDispatch, useProductState };
