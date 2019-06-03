import React from 'react';
import Select from 'react-select';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSorterContainer = styled.div`
  flex: 0 1 25%;
`;
const Sorter = ({ filters = [], OnSort }) => (
  <StyledSorterContainer>
    <Select options={filters} placeholder="Sort by" onChange={OnSort} />
  </StyledSorterContainer>
);

Sorter.propTypes = {
  filters: PropTypes.shape({
    value: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
  OnSort: PropTypes.func.isRequired,
};

export default Sorter;
