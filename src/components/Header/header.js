import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const StyledHeader = styled.header`
  background: ${props => props.theme.Colors.yellow.gold};
  display: flex;
  /* max-height: 166px; */
  width: 100%;
  /* justify-content: center; */
  margin-bottom: 2.375rem;
  /* margin: 0 auto; */
  grid-area: header;

  div {
    display: flex;
    width: 100%;
    align-items: center;
  }
  a {
    font-size: 2.25rem;
    color: ${props => props.theme.Colors.grayScale.white};
    letter-spacing: 0;
    line-height: 2.0625rem;
    /* text-align: left; */
    text-transform: capitalize;
    margin-left: 7.875rem;
    /* margin-right: auto; */
    flex: 0 1 20%;
    text-decoration: none;
  }

  form {
    flex: 0 1 40%;
  }

  input {
    background: ${props => props.theme.Colors.grayScale.white};
    border-radius: 4px;
    width: 80%;
    height: 51px;
    /* flex: 0 1 60%; */
  }
`;

const StyledSearchBoxContainer = styled.div`
  position: relative;

  svg {
    background: ${props => props.theme.Colors.grayScale.white};
    font-size: 51px;
    /* height: 100%; */
    /* height: 51px; */
  }
`;

const Header = ({ title, filterCallBack, defaultText = '' }) => {
  const [searchText, setSearchText] = useState(defaultText);

  console.log(defaultText);
  function handleTextChange(event) {
    event.preventDefault();
    console.log(event.target.value);
    setSearchText(event.target.value);
  }

  function handleFilterByText(event) {
    event.preventDefault();
    if (searchText !== defaultText) {
      filterCallBack(searchText);
    }
  }
  return (
    <StyledHeader>
      <div>
        <a href="/">{title}</a>
        <form onSubmit={handleFilterByText} onBlur={handleFilterByText}>
          <StyledSearchBoxContainer>
            <FontAwesomeIcon icon={faSearch} fixedWidth />
            <input
              type="search"
              name="search-box"
              placeholder="Search by products by name"
              onChange={handleTextChange}
              value={searchText}
            />
          </StyledSearchBoxContainer>
        </form>
      </div>
    </StyledHeader>
  );
};

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
