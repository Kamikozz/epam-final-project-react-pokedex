import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from '@testing-library/react';

import Nav from './Nav';

it('renders without crashing', () => {
  render(
    <Router>
      <Nav selected={0} />
    </Router>
  );
});

describe('matches snapshot', () => {
  it('with selected=0', () => {
    const { container } = render(
      <Router>
        <Nav selected={0} />
      </Router>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('with selected=1', () => {
    const { container } = render(
      <Router>
        <Nav selected={1} />
      </Router>
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  it('with selected more than number of tabs', () => {
    const { container } = render(
      <Router>
        <Nav selected={10} />
      </Router>
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});

