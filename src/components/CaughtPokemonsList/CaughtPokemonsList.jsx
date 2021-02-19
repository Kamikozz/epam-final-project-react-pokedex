import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CaughtPokemon from "../CaughtPokemon/CaughtPokemon";
import Loader from "../Loader/Loader";
import services from "../../services/pokemons";

const styles = theme => ({
  root: {
    margin: "20px",
    flexGrow: 1
  }
});

class CaughtPokemonsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: 1,
      caughtPokemons: []
    };
    this.getCaughtPokemonsList = this.getCaughtPokemonsList.bind(this);
  }

  async getCaughtPokemonsList() {
    const caughtPokemons = await services.getCaughtPokemons(
      this.state.currentUserId
    );
    this.setState({ caughtPokemons });
  }

  componentDidMount() {
    this.getCaughtPokemonsList();
  }

  render() {
    const { classes } = this.props;

    if (!this.state.caughtPokemons.length) return <Loader text />;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          {this.state.caughtPokemons.map(pokemon => (
            <CaughtPokemon
              key={pokemon.id}
              pokemonId={pokemon.pokemonId}
              name={pokemon.name}
              date={pokemon.caughtDate}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

CaughtPokemonsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CaughtPokemonsList);
