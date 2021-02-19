import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import CaughtPokemon from "../CaughtPokemon/CaughtPokemon";
import Loader from "../Loader/Loader";
import services from "../../services/pokemons";
import EmptyCaughtPokemonsList from "../EmptyCaughtPokemonsList/EmptyCaughtPokemonsList";

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
      caughtPokemons: null
    };
  }

  async getCaughtPokemonsList() {
    const caughtPokemons = await services.getCaughtPokemons();
    this.setState({ caughtPokemons });
  }

  componentDidMount() {
    console.log("CaughtPokemonsList-ComponentDidMount");
    this.getCaughtPokemonsList();
  }

  render() {
    const { caughtPokemons } = this.state;

    if (!caughtPokemons) return <Loader text />;
    if (!caughtPokemons.length) return <EmptyCaughtPokemonsList />;

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          {caughtPokemons.map(pokemon => (
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
