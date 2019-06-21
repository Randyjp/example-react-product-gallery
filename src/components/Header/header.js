import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import FlatButton from '../FlatButton';
import { useSearchTextDispatch } from '../../context/searchTextFilterContext';

const StyledHeader = styled.header`
  background: ${props => props.theme.Colors.yellow.gold};
  display: grid;
  grid-area: header;
  grid-template-columns: 1fr;
  grid-template-areas: 'header-content';
  width: 100%;

  form {
    flex: 0 1 auto;
  }

  @media (min-width: 47.9375rem) {
    grid-template-columns: 1fr 2fr 5fr 1fr;
    grid-template-areas: '. header-content header-content .';
    form {
      flex: 0 1 60%;
    }
  }
`;

const StyledSearchBox = styled.input`
  background: ${props => props.theme.Colors.grayScale.white};
  border-radius: 0.5rem;
  height: 3.1875rem;
  text-indent: 3rem;
  width: 100%;
`;

const StyledStoreTitle = styled.a`
  font-size: 2.25rem;
  color: ${props => props.theme.Colors.grayScale.white};
  letter-spacing: 0;
  line-height: 2.0625rem;
  margin-bottom: 1rem;
  text-decoration: none;
  text-transform: capitalize;

  @media (min-width: 47.9375rem) {
    flex: 0 1 20%;
  }
`;

const StyledHeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  grid-area: header-content;
  margin: auto;
  text-align: center;
  width: 50%;

  @media (min-width: 47.9375rem) {
    align-items: center;
    flex-direction: row;
    text-align: left;
    width: 100%;
  }
`;

const StyledSearchBoxContainer = styled.div`
  position: relative;
`;

const StyledSearchButton = styled(FlatButton)`
  color: ${props => props.theme.Colors.grayScale.darkGray3};
  position: absolute;
  top: 17px;
  left: 4px;
`;

const Header = ({ title, searchText }) => {
  const setSearchTextContext = useSearchTextDispatch();
  const [LocalSearchText, setLocalSearchText] = useState(searchText);

  function handleTextChange(event) {
    event.preventDefault();
    setLocalSearchText(event.target.value);
  }

  function handleFilterByText(event) {
    event.preventDefault();
    if (LocalSearchText !== searchText) {
      setSearchTextContext(LocalSearchText);
    }
  }
  return (
    <StyledHeader>
      <StyledHeaderContent>
        <StyledStoreTitle href="/">{title}</StyledStoreTitle>
        <form onSubmit={handleFilterByText} onBlur={handleFilterByText}>
          <StyledSearchBoxContainer>
            <StyledSearchButton>
              <FontAwesomeIcon icon={faSearch} />
            </StyledSearchButton>
            <StyledSearchBox
              type="search"
              name="search-box"
              placeholder="Search by product by name"
              onChange={handleTextChange}
              value={LocalSearchText}
            />
          </StyledSearchBoxContainer>
        </form>
      </StyledHeaderContent>
    </StyledHeader>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
  searchText: PropTypes.string.isRequired,
};

export default Header;
