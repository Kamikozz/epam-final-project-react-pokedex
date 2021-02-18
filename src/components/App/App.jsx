import React from "react";
import { Route, Switch } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import Nav from "../Nav/Nav";
import PokemonsList from "../PokemonsList/PokemonsList";
import CaughtPokemonsList from "../CaughtPokemonsList/CaughtPokemonsList";
import NotFound from "../NotFound/NotFound";
import Pokemon from "../Pokemon/Pokemon";
import routes from "../../routes";

const styles = theme => ({
  root: {
    textAlign: "center"
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    minHeight: "calc(100vh - 72px)",
    color: "white",
    fontSize: "calc(10px + 2vmin)",
    backgroundColor: "#282c34"
  }
});

class App extends React.Component {
  render() {
    const { classes } = this.props;
    const selectedTab =
      this.props.location.pathname === routes.pokemonsList ? 0 : 1;

    return (
      <div className={classes.root}>
        <Nav selected={selectedTab} />
        <section className={classes.main}>
          <Switch>
            <Route exact path={routes.pokemonsList} component={PokemonsList} />
            <Route exact path={routes.pokemon} component={Pokemon} />
            <Route
              exact
              path={routes.caughtPokemonsList}
              component={CaughtPokemonsList}
            />
            <Route component={NotFound} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default withStyles(styles)(App);
