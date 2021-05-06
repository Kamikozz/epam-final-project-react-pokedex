import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from '@testing-library/react';

import NotFound from './NotFound';

it('renders without crashing', () => {
  render(
    <Router>
      <NotFound />
    </Router>
  );
});

it('matches snapshot', () => {
  const { container } = render(
    <Router>
      <NotFound />
    </Router>
  );
  expect(container.firstChild).toMatchSnapshot()
});

