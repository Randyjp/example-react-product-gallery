import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const CategoryStateContext = React.createContext();
const CategoryDispatchContext = React.createContext();

function CategoryProvider({ children }) {
  const [category, setCategory] = useState(1);

  return (
    <CategoryStateContext.Provider value={category}>
      <CategoryDispatchContext.Provider value={setCategory}>
        {children}
      </CategoryDispatchContext.Provider>
    </CategoryStateContext.Provider>
  );
}

CategoryProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

function useCategoryState() {
  const context = useContext(CategoryStateContext);

  if (context === undefined) {
    throw new Error(
      'useCategoryState must be render withing a CategoryProvider component'
    );
  }

  return context;
}

function useCategoryDispatch() {
  const context = useContext(CategoryDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useCategoryDispatch must be render withing a CategoryProvider component'
    );
  }

  return context;
}

export { CategoryProvider, useCategoryDispatch, useCategoryState };
