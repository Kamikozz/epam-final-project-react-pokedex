import React from "react";
import { ProvidedState as ContextProps } from "./components/App/App";

const AppContext = React.createContext<ContextProps>({
  userId: 1,
  page: 1,
  caughtPokemons: null,
  caughtPokemonIds: null,
  pokemons: [],
  setAppState: () => {},
});

export default AppContext;
