import React from "react";
import { Route, Switch } from "react-router-dom";

import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import Nav from "../Nav/Nav";
import PokemonsPage from "../../pages/PokemonsPage/PokemonsPage";
import CaughtPokemonsPage from "../../pages/CaughtPokemonsPage/CaughtPokemonsPage";
import NotFound from "../NotFound/NotFound";
import PokemonPage from "../../pages/PokemonPage/PokemonPage";
import routes from "../../routes";
import AppContext from "../../AppContext";

const styles = () => createStyles({
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

interface AppProps extends WithStyles<typeof styles> {
  location?: any;
  // classes: any;
  classes: {
    root: string;
    main: string;
  };
};

interface AppState {
    userId: number;
    page: number;
    caughtPokemons: null | Array<Object>;
    caughtPokemonIds: null | Set<number>;
    pokemons: Array<Object>;
    setAppState: Function;
    setUserId: Function;
    setPage: Function;
    setCaughtPokemons: Function;
    setCaughtPokemonIds: Function;
    setPokemons: Function;
};

class App extends React.Component <AppProps, AppState> {
  constructor(props: AppProps) {
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

  setAppState(state: AppState) {
    this.setState(state);
  }

  setUserId(userId: number) {
    this.setState({ userId });
  }

  setPage(page: number) {
    this.setState({ page });
  }

  setCaughtPokemons(caughtPokemons: Array<Object>) {
    this.setState({ caughtPokemons });
  }

  setCaughtPokemonIds(caughtPokemonIds: Set<number>) {
    this.setState({ caughtPokemonIds });
  }

  setPokemons(pokemons: Array<Object>) {
    this.setState({ pokemons });
  }

  render() {
    const { classes } = this.props;
    const selectedTab = this.props.location && this.props.location.pathname === routes.pokemonsPage ? 0 : 1;

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
