import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const StyledLayout = styled.div`
  display: grid;
  /* justify-items: center; */
  grid-gap: 1.5rem;

  grid-template-columns: 1fr 2fr 5fr 1fr;
  grid-template-rows: 10.375rem 10fr;
  grid-template-areas:
    'header header header header'
    '. sidebar-1 content .';
`;

const Layout = ({ children }) => <StyledLayout>{children}</StyledLayout>;

Layout.propTypes = {
  children: PropTypes.arrayOf(PropTypes.element).isRequired,
};

export default Layout;
