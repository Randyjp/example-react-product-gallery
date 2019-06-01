import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSearch} from '@fortawesome/free-solid-svg-icons';

const StyledHeader = styled.header`
  background: ${props => props.theme.Colors.yellow.gold};
  display: flex;
  /* height: 166px; */
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

const Header = ({title}) => (
  <StyledHeader>
    <div>
      <a href="/">{title}</a>
      <form>
        <StyledSearchBoxContainer>
          <FontAwesomeIcon icon={faSearch} fixedWidth />
          <input
            type="search"
            name="search-box"
            placeholder="Search by products by name"
          />
        </StyledSearchBoxContainer>
      </form>
    </div>
  </StyledHeader>
);

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
