import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from 'styled-components';

import { render as originalRender } from '@testing-library/react';
import theme from '../styles/theme';

function render(
  ui,
  {
    route = '/',
    history = createBrowserHistory({
      initialEntries: [route],
    }),
    // eslint-disable-next-line no-unused-vars
    ...options
  } = {}
) {
  return {
    history,
    ...originalRender(
      <Router history={history}>
        <ThemeProvider theme={theme}>{ui}</ThemeProvider>
      </Router>
    ),
  };
}

export { render };
