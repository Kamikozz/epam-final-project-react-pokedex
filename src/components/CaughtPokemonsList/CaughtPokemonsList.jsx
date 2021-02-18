import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import config from "../../config/config.json";
import CaughtPokemon from "../CaughtPokemon/CaughtPokemon";
import Loader from "../Loader/Loader";

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

  getCaughtPokemonsList() {
    const endpoint = `/user/${this.state.currentUserId}/
		caught_pokemons`;
    const url = `${config.host}:${config.port}${endpoint}`;
    fetch(url)
      .then(res => res.json())
      .then(pokemons => {
        this.setState({ caughtPokemons: pokemons });
      })
      .catch(err => console.error(err));
  }

  componentDidMount() {
    this.getCaughtPokemonsList();
  }

  render() {
    const { classes } = this.props;

    console.log(this.state.caughtPokemons);

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
