import React, { createContext } from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import { render } from '@testing-library/react';
import Provider from '../context/Provider';

function withRouter(component, history) {
  return (
    <Router history={ history }>
      { component }
    </Router>
  );
}

function withRedux(component, store) {
  return (
    <Provider store={ store }>
      { component }
    </Provider>
  );
}

function renderWithContext(component, options = {}) {
  const {
    initialState = {},
    TestContext = createContext(null, initialState),
  } = options;

  return {
    ...render(withRedux(component, TestContext)),
    TestContext,
  };
}

export default function renderWithRouterAndContext(component, options = {}) {
  const {
    initialEntries = ['/'],
    history = createMemoryHistory({ initialEntries }),
  } = options;

  return {
    ...renderWithContext(withRouter(component, history), options),
    history,
  };
}
