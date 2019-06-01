import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledFacets = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin-bottom: 1.25rem;
  padding: 0;

  > li {
    padding: 0;
  }
`;

const StyledLink = styled(Link)`
  color: ${props =>
    props.active
      ? props.theme.Colors.yellow.gold
      : props.theme.Colors.grayScale.black};
  font-size: 0.9375rem;
  letter-spacing: 0;
  line-height: 1.9375rem;
  padding: 0.5rem 0.5rem 0.5rem 0;
  text-decoration: none;

  :hover {
    color: ${props => props.theme.Colors.yellow.gold};
  }
`;

const Facet = ({ categories }, ...rest) => {
  function appendQueryToLink(name, query) {
    const urlParams = new URLSearchParams(window.location.search);
    const currentCategory = parseInt(urlParams.get(name));
    urlParams.set(name, query.id);
    return (
      <StyledLink
        to={{
          pathname: '/products',
          search: `?${urlParams.toString()}`,
        }}
        active={query.id === currentCategory ? 1 : 0}
      >
        {query.name}
      </StyledLink>
    );
  }

  return (
    <StyledFacets>
      {categories.map(category => (
        <li key={category.id}>{appendQueryToLink('category', category)}</li>
      ))}
    </StyledFacets>
  );
};

export default Facet;
