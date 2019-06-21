import React, { useState, useContext } from 'react';
import PropTypes from 'prop-types';

const SearchTextStateContext = React.createContext();
const SearchTextDispatchContext = React.createContext();

function SearchTextProvider({ children }) {
  const [searchText, setSearchText] = useState('');

  return (
    <SearchTextStateContext.Provider value={searchText}>
      <SearchTextDispatchContext.Provider value={setSearchText}>
        {children}
      </SearchTextDispatchContext.Provider>
    </SearchTextStateContext.Provider>
  );
}

SearchTextProvider.propTypes = {
  children: PropTypes.element.isRequired,
};

function useSearchTextState() {
  const context = useContext(SearchTextStateContext);

  if (context === undefined) {
    throw new Error(
      'useSearchTextState must be render withing a SearchTextProvider component'
    );
  }

  return context;
}

function useSearchTextDispatch() {
  const context = useContext(SearchTextDispatchContext);

  if (context === undefined) {
    throw new Error(
      'useSearchTextDispatch must be render withing a SearchTextProvider component'
    );
  }

  return context;
}

export { useSearchTextState, useSearchTextDispatch, SearchTextProvider };
