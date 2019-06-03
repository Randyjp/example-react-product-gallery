import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledSideBar = styled.div`
  grid-area: sidebar-1;

  > h3 {
    font-size: 0.875rem;
    text-transform: uppercase;
  }
`;

const SideBar = ({ title, children }) => (
  <StyledSideBar>
    {title && <h3>{title}</h3>}
    {children}
  </StyledSideBar>
);

SideBar.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};
export default SideBar;
