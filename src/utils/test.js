import React from 'react';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { ThemeProvider } from 'styled-components';

import { render as originalRender } from '@testing-library/react';
import theme from '../styles/theme';
import { AppProvider } from '../context/appContext';

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
        <AppProvider>
          <ThemeProvider theme={theme}>{ui}</ThemeProvider>
        </AppProvider>
      </Router>
    ),
  };
}

export { render };
