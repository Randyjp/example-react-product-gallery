import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import queryString from 'query-string';
import {Link} from 'react-router-dom';
import {createBrowserHistory} from 'history';

const StyledFacets = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;

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
  padding: 0.5rem;
  text-decoration: none;

  :hover {
    color: ${props => props.theme.Colors.yellow.gold};
  }
`;

const Facet = ({categories}, ...rest) => {
  // console.log(rest);
  // const history = createBrowserHistory();
  // const location = Object.assign({}, history.location);
  // const handleFilter = event => {
  //   event.preventDefault();
  //   const {target} = event;

  //   if (target.hasAttribute('href')) {
  //     // const urlParams = new URLSearchParams(window.location.search);
  //     const url = queryString.parseUrl(event.target.href);
  //     urlParams.set('category', url.query.category);
  //     console.log(url.query);
  //     // Object.assign(location.query, url.query);
  //     console.log(location.search);
  //     // console.log(url);
  //     // history.push({
  //     //   pathname: '/products',
  //     //   search: `?${urlParams.toString()}`,
  //     // });

  //     // <Router history={history} />;
  //     // window.history.pushState(
  //     //   'obj',
  //     //   'page 2',
  //     //   `${url.url}?${urlParams.toString()}`
  //     // );
  //     // window.location = `${url.url}/?${urlParams.toString()}`;
  //     // console.log(urlParams.toString());
  //   }
  // };
  function appendQueryToLink(name, query) {
    const urlParams = new URLSearchParams(window.location.search);
    const current_category = parseInt(urlParams.get(name));
    urlParams.set(name, query.id);
    return (
      <StyledLink
        to={{
          pathname: '/products',
          search: `?${urlParams.toString()}`,
        }}
        active={query.id === current_category ? 1 : 0}
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
