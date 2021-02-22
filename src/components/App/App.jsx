import React from "react";
import { Route, Switch } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";

import Nav from "../Nav/Nav";
import PokemonsPage from "../../pages/PokemonsPage/PokemonsPage";
import CaughtPokemonsPage from "../../pages/CaughtPokemonsPage/CaughtPokemonsPage";
import NotFound from "../NotFound/NotFound";
import PokemonPage from "../../pages/PokemonPage/PokemonPage";
import routes from "../../routes";
import AppContext from "../../AppContext";

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
  constructor(props) {
    super(props);
    this.state = {
      userId: 1,
      page: 1,
      caughtPokemons: null,
      caughtPokemonIds: null,
      pokemons: [],
      setAppState: this.setAppState.bind(this),
      setUserId: this.setUserId.bind(this),
      setPage: this.setPage.bind(this),
      setCaughtPokemons: this.setCaughtPokemons.bind(this),
      setCaughtPokemonIds: this.setCaughtPokemonIds.bind(this),
      setPokemons: this.setPokemons.bind(this)
    };
  }

  setAppState(state) {
    this.setState(state);
  }

  setUserId(userId) {
    this.setState({ userId });
  }

  setPage(page) {
    this.setState({ page });
  }

  setCaughtPokemons(caughtPokemons) {
    this.setState({ caughtPokemons });
  }

  setCaughtPokemonIds(caughtPokemonIds) {
    this.setState({ caughtPokemonIds });
  }

  setPokemons(pokemons) {
    this.setState({ pokemons });
  }

  render() {
    const { classes } = this.props;
    const selectedTab =
      this.props.location.pathname === routes.pokemonsPage ? 0 : 1;

    return (
      <AppContext.Provider value={this.state}>
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
  }
}

export default withStyles(styles)(App);
