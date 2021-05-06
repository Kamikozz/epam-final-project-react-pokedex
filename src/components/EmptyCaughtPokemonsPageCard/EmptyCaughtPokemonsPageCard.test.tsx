import React from 'react';
import { render } from '@testing-library/react';

import EmptyCaughtPokemonsPageCard from './EmptyCaughtPokemonsPageCard';

it('renders without crashing', () => {
  render(<EmptyCaughtPokemonsPageCard />);
});

it('matches snapshot', () => {
  const { container } = render(<EmptyCaughtPokemonsPageCard />);
  expect(container.firstChild).toMatchSnapshot()
});

