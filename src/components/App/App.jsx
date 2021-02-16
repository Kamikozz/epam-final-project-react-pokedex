import React from "react";
import { Route, Switch } from "react-router-dom";

import Nav from "../Nav/Nav";
import List from "../List/List";
import CaughtPokemons from "../CaughtPokemons/CaughtPokemons";
import NotFound from "../NotFound/NotFound";
import Pokemon from "../Pokemon/Pokemon";
import "./App.css";
import routes from "../../routes";

class App extends React.Component {
  render() {
    const selectedTab = this.props.location.pathname === routes.pokemonsList ? 0 : 1;

    return (
      <div className="App">
        <Nav selected={selectedTab} />
        <section className="App-section">
          <Switch>
            <Route exact path={routes.pokemonsList} component={List} />
            <Route exact path={routes.pokemon} component={Pokemon} />
            <Route
              exact
              path={routes.caughtPokemonsList}
              component={CaughtPokemons}
            />
            <Route component={NotFound} />
          </Switch>
        </section>
      </div>
    );
  }
}

export default App;
