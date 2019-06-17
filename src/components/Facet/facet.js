import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  useCategoryState,
  useCategoryDispatch,
} from '../../context/categoryContext';

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

const StyledLink = styled.a`
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

const Facet = ({ categories = [] }) => {
  const currentCategory = useCategoryState();
  const setCurrentCategory = useCategoryDispatch();

  function handleCategoryChange(event) {
    event.preventDefault();
    const { categoryId } = event.target.dataset;

    if (categoryId) {
      const numericCategory = Number.parseInt(categoryId, 10) || 1;
      setCurrentCategory(numericCategory);
    }
  }

  function anchorFactory(baseUrl, category) {
    return (
      <StyledLink
        href={`${baseUrl}${category.id}`}
        data-category-id={category.id}
        active={category.id === currentCategory}
      >
        {category.name}
      </StyledLink>
    );
  }

  return (
    <StyledFacets onClick={handleCategoryChange}>
      {categories.map(category => (
        <li key={category.id}>{anchorFactory('/', category)}</li>
      ))}
    </StyledFacets>
  );
};

Facet.propTypes = {
  // eslint-disable-next-line react/require-default-props
  categories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired
  ),
};
export default Facet;
