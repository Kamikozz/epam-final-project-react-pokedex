import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import PokemonItem from "../../components/PokemonItem/PokemonItem";
import Loader from "../../components/Loader/Loader";
import services from "../../services/pokemons";
import EmptyCaughtPokemonsPageCard from "../../components/EmptyCaughtPokemonsPageCard/EmptyCaughtPokemonsPageCard";
import AppContext from "../../AppContext";

const styles = theme => ({
  root: {
    margin: "20px",
    flexGrow: 1
  }
});

class CaughtPokemonsPage extends React.Component {
  constructor(props) {
    super(props);
  }

  async getCaughtPokemonsList() {
    let { caughtPokemons } = this.context;
    if (caughtPokemons) return;

    const { userId, setCaughtPokemons } = this.context;
    caughtPokemons = await services.getCaughtPokemons(userId);
    setCaughtPokemons(caughtPokemons);
  }

  componentDidMount() {
    console.log("CaughtPokemonsPage-ComponentDidMount");
    // FIXME: написать алгоритм аналогичный PokemonsPage для дозагрузки нужного количества пойманных покемонов
    this.getCaughtPokemonsList();
  }

  render() {
    const { caughtPokemons } = this.context;

    if (!caughtPokemons) return <Loader text />;
    if (!caughtPokemons.length) return <EmptyCaughtPokemonsPageCard />;

    console.log("CaughtPokemonsPage-Render", this.context);

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          {caughtPokemons.map(pokemon => (
            <PokemonItem
              key={pokemon.id}
              pokemonId={pokemon.pokemonId}
              name={pokemon.name}
              date={pokemon.caughtDate}
              link
            />
          ))}
        </Grid>
      </div>
    );
  }
}

CaughtPokemonsPage.contextType = AppContext;
CaughtPokemonsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CaughtPokemonsPage);
