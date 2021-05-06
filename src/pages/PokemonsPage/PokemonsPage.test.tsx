import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import { PokemonsPage } from './PokemonsPage';
import routes from '../../routes';
import store from "../../store";

beforeAll(() => {
  window.HTMLElement.prototype.scrollIntoView = jest.fn();
});

it('renders without crashing', () => {
  render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path={routes.pokemonsPage} component={PokemonsPage} />
        </Switch>
      </Router>
    </Provider>
  );
});

it('matches snapshot', () => {
  const { container } = render(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path={routes.pokemonsPage} component={PokemonsPage} />
        </Switch>
      </Router>
    </Provider>
  );
  expect(container.firstChild).toMatchSnapshot()
});

