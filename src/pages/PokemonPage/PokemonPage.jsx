import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import Loader from "../../components/Loader/Loader";
import services from "../../services/pokemons";
import AppContext from "../../AppContext";
import PokemonItem from "../../components/PokemonItem/PokemonItem";

const styles = theme => ({
  root: {
    margin: "20px",
    flexGrow: 1
  },
  actions: {
    justifyContent: "center"
  }
});

class PokemonPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null,
      pokemonId: Number(this.props.match.params.id)
    };
    this.catchPokemon = this.catchPokemon.bind(this);
  }

  async getPokemon() {
    let pokemon;
    // check if already cached
    const { pokemons } = this.context;
    const { pokemonId } = this.state;
    if (pokemons) {
      pokemon = pokemons.find(item => item.id === pokemonId);
    }

    if (!pokemon) {
      pokemon = await services.getPokemon(pokemonId);
    }
    return pokemon;
  }

  async getCaughtPokemon() {
    let caughtPokemon;
    // check if already cached
    const { caughtPokemons } = this.context;
    const { pokemonId } = this.state;
    if (caughtPokemons) {
      caughtPokemon = caughtPokemons.find(item => item.pokemonId === pokemonId);
    }

    if (!caughtPokemon) {
      const { userId } = this.context;
      caughtPokemon = await services.getCaughtPokemon(userId, pokemonId);
    }
    return caughtPokemon;
  }

  async catchPokemon() {
    const { userId } = this.context;
    const { pokemonId } = this.state;
    const data = await services.postCaughtPokemon(userId, {
      pokemonId,
      caughtDate: new Date().toLocaleString(),
      name: this.state.data.name
    });
    this.setState({ data });

    const { caughtPokemons, caughtPokemonIds } = this.context;

    // if already cached caughtPokemons in the application
    if (caughtPokemons) {
      caughtPokemons.push(data);
      caughtPokemonIds.add(pokemonId);
    }
  }

  async getPokemonData() {
    let data = await this.getCaughtPokemon();
    if (!data) {
      data = await this.getPokemon();
    }
    this.setState({ data });
  }

  componentDidMount() {
    this.getPokemonData();
  }

  render() {
    console.log("EXACT POKEMON");
    const { data, pokemonId } = this.state;
    if (!data) return <Loader text />;

    const { classes } = this.props;
    const { name: pokemonName, caughtDate } = data;
    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          <PokemonItem
            key={pokemonId}
            pokemonId={pokemonId}
            name={pokemonName}
            date={caughtDate}
            cardActions={
              !caughtDate && (
                <CardActions className={classes.actions}>
                  <Button
                    variant="outlined"
                    size="medium"
                    color="primary"
                    onClick={this.catchPokemon}
                  >
                    Catch
                  </Button>
                </CardActions>
              )
            }
          />
        </Grid>
      </div>
    );
  }
}

PokemonPage.contextType = AppContext;
PokemonPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PokemonPage);
