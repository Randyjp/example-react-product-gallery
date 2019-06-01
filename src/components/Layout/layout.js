import React from 'react';
import styled from 'styled-components';

const StyledLayout = styled.div`
  display: grid;
  grid-gap: 1.5rem;
  grid-template-columns: 3fr 10fr 3fr;
  grid-template-rows: 2fr 10fr;
  grid-template-areas:
    'header header header'
    'sidebar-1 content sidebar-2'
    'sidebar-1 content sidebar-2';
`;

const Layout = ({children}) => <StyledLayout>{children}</StyledLayout>;

export default Layout;
