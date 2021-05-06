import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { render } from '@testing-library/react';

import PokemonItem from './PokemonItem';

it('renders without crashing', () => {
  render(
    <Router>
      <PokemonItem pokemonId={1} name={'some name'} />
    </Router>
  );
});

it('matches snapshot', () => {
  const { container } = render(
    <Router>
      <PokemonItem pokemonId={1} name={'some name'} />
    </Router>
  );
  expect(container.firstChild).toMatchSnapshot()
});

