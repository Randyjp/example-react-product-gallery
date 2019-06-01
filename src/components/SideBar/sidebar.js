import React from 'react';
import styled from 'styled-components';

const StyledSideBar = styled.div`
  grid-area: sidebar-1;

  > h3 {
    font-size: 0.875rem;
    /* color: #000000; */
    /* letter-spacing: 0; */
    /* text-align: left; */
  }
`;

const SideBar = ({title, children}) => (
  <StyledSideBar>
    {title && <h3>{title}</h3>}
    {children}
  </StyledSideBar>
);

export default SideBar;
