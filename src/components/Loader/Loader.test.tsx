import React from 'react';
import { render } from '@testing-library/react';

import Loader from './Loader';

it('renders without crashing', () => {
  render(<Loader />);
});

it('matches snapshot', () => {
  const { container } = render(<Loader />);
  expect(container.firstChild).toMatchSnapshot();
});

