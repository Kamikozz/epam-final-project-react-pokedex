import React, { useReducer } from "react";
import { Route, Switch } from "react-router-dom";

import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Nav from "../Nav/Nav";
import PokemonsPage from "../../pages/PokemonsPage/PokemonsPage";
import CaughtPokemonsPage from "../../pages/CaughtPokemonsPage/CaughtPokemonsPage";
import NotFound from "../NotFound/NotFound";
import PokemonPage from "../../pages/PokemonPage/PokemonPage";
import routes from "../../routes";
import { AppContext, ContextType, reducer, initialState } from "../../reducer";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {
  location?: any;
  classes: {
    root: string;
    main: string;
  };
};

const App = (props: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const context: ContextType = { dispatch, state };
  const { classes } = props;
  const selectedTab = props.location.pathname === routes.pokemonsPage ? 0 : 1;

  return (
    <AppContext.Provider value={context}>
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
