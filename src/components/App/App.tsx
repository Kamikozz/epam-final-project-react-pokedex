import React, { useState } from "react";
import { Route, Switch } from "react-router-dom";

import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Nav from "../Nav/Nav";
import PokemonsPage from "../../pages/PokemonsPage/PokemonsPage";
import CaughtPokemonsPage, { ICaughtPokemon } from "../../pages/CaughtPokemonsPage/CaughtPokemonsPage";
import NotFound from "../NotFound/NotFound";
import PokemonPage, { IPokemon } from "../../pages/PokemonPage/PokemonPage";
import routes from "../../routes";
import AppContext from "../../AppContext";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {
  location?: any;
  classes: {
    root: string;
    main: string;
  };
};

interface AppState {
  userId: number;
  page: number;
  caughtPokemons: null | Array<ICaughtPokemon>;
  caughtPokemonIds: null | Set<number>;
  pokemons: Array<IPokemon>;
};

interface PartialAppState {
  userId?: number;
  page?: number;
  caughtPokemons?: null | Array<ICaughtPokemon>;
  caughtPokemonIds?: null | Set<number>;
  pokemons?: Array<IPokemon>;
}

type SetAppStateHandler = (newState: PartialAppState) => void;

export interface ProvidedState extends AppState {
  setAppState: SetAppStateHandler;
  setUserId?: Function;
  setPage?: Function;
  setCaughtPokemons?: Function;
  setCaughtPokemonIds?: Function;
  setPokemons?: Function;
}

const initialState: AppState = {
  userId: 1,
  page: 1,
  caughtPokemons: null,
  caughtPokemonIds: null,
  pokemons: [],
};

const App = (props: Props) => {
  const [state, setState] = useState(initialState);
  const state1: ProvidedState = {
    userId: state.userId,
    page: state.page,
    caughtPokemons: state.caughtPokemons,
    caughtPokemonIds: state.caughtPokemonIds,
    pokemons: state.pokemons,
    setAppState: (newState: Object | AppState) => {
      setState((prevState) => {
        return {
          ...prevState,
          ...newState
        };
      });
    },
  };

  const { classes } = props;
  const selectedTab = props.location.pathname === routes.pokemonsPage ? 0 : 1;

  return (
    <AppContext.Provider value={state1}>
      <div className={classes.root}>
        <Nav selected={selectedTab} />
        <section className={classes.main}>
          <Switch>
            <Route
              exact
              path={routes.pokemonsPage}
              component={PokemonsPage}
            />
            <Route exact path={routes.pokemonPage} component={PokemonPage} />
            <Route
              exact
              path={routes.caughtPokemonsPage}
              component={CaughtPokemonsPage}
            />
            <Route component={NotFound} />
          </Switch>
        </section>
      </div>
    </AppContext.Provider>
  );
};

export default withStyles(styles)(App);
