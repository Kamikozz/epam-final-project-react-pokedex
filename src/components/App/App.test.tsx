import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';

import App from './App';
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
          <Route path={routes.pokemonsPage} component={App} />
        </Switch>
      </Router>
    </Provider>
  );
});
