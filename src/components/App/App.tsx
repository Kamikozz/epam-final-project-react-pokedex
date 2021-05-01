import React from "react";
import { Route, Switch } from "react-router-dom";

import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { PokemonsPage, CaughtPokemonsPage, PokemonPage } from "../../pages";
import { Nav, NotFound } from "../index";
import routes from "../../routes";
import styles from "./styles";
interface Props extends WithStyles<typeof styles> {
  location?: any;
};

const Component = ({ classes, location }: Props) => {
  const selectedTab = location.pathname === routes.pokemonsPage ? 0 : 1;

  return (
    <div className={classes.root}>
      <Nav selected={selectedTab} />
      <section className={classes.main}>
        <Switch>
          <Route exact path={routes.pokemonsPage} component={PokemonsPage} />
          <Route exact path={routes.pokemonPage} component={PokemonPage} />
          <Route exact path={routes.caughtPokemonsPage} component={CaughtPokemonsPage} />
          <Route component={NotFound} />
        </Switch>
      </section>
    </div>
  );
};

const App = withStyles(styles)(Component);

export default App;
