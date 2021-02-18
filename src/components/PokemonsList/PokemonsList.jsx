import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import config from "../../config/config.json";
import CaughtPokemon from "../CaughtPokemon/CaughtPokemon";
import Loader from "../Loader/Loader";

const styles = theme => ({
  root: {
    margin: "20px",
    flexGrow: 1
  },
  card: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  actions: {
    justifyContent: "center"
  },
  media: {
    height: 400
  },
  nextPageButtonWrapper: {
    position: "relative"
  },
  nextPageButton: {
    margin: "10px 0 10px 0",
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "red"
    }
  },
  nextPageButtonLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

function scrollToBottom(el) {
  el.scrollIntoView({ behavior: "smooth" });
}

class PokemonsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: 1,
      pokemons: [],
      caughtPokemons: [],
      page: 1,
      caughtPokemonIds: null,
      isNextPageLoading: false,
      endOfPage: null
    };
    this.handleNext = this.handleNext.bind(this);
    this.getPokemonsList = this.getPokemonsList.bind(this);
    this.getCaughtPokemonsList = this.getCaughtPokemonsList.bind(this);
  }

  handleNext() {
    const nextPageNo = this.state.page + 1;
    this.setState({ page: nextPageNo, isNextPageLoading: true }, async () => {
      await this.getPokemons();
      scrollToBottom(this.endOfPage);
    });
  }

  getPokemonsList(page) {
    const endpoint = "/pokemons";
    const params = `?_page=${page}&_limit=20`;
    const url = `${config.host}:${config.port}${endpoint}${params}`;
    return fetch(url)
      .then(res => res.json())
      .then(newPokemons => {
        const pokemonsArr = [].concat(this.state.pokemons, newPokemons);
        this.setState({ pokemons: pokemonsArr });
      })
      .catch(err => console.error(err));
  }

  getCaughtPokemonsList(page) {
    const endpoint = `/users/${this.state.currentUserId}/
		caught_pokemons`;
    const params = `?pokemonId_gte=${1 + page * 20 - 20}&pokemonId_lte=${page *
      20}`;
    const url = `${config.host}:${config.port}${endpoint}${params}`;
    return fetch(url)
      .then(res => res.json())
      .then(newPokemons => {
        const caughtPokemonsArr = [].concat(
          this.state.caughtPokemons,
          newPokemons
        );
        this.setState({ caughtPokemons: caughtPokemonsArr });
      })
      .catch(err => console.error(err));
  }

  async getPokemons() {
    await this.getCaughtPokemonsList(this.state.page);
    await this.getPokemonsList(this.state.page);
    this.setState({
      caughtPokemonIds: new Set(
        this.state.caughtPokemons.map(({ pokemonId }) => pokemonId)
      ),
      isNextPageLoading: false
    });
  }

  catchPokemon(pokemonId, name) {
    console.log("Пойман покемон из PokemonsList.jsx");
    const endpoint = `/users/${this.state.currentUserId}/caught_pokemons`;
    const url = `${config.host}:${config.port}${endpoint}`;
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pokemonId,
        caughtDate: new Date().toLocaleString(),
        name
      })
    });
    this.setState(state => {
      const caughtPokemonIds = state.caughtPokemonIds.add(pokemonId);
      return {
        caughtPokemonIds
      };
    });
  }

  componentDidMount() {
    this.getPokemons();
  }

  render() {
    const { classes } = this.props;
    const { caughtPokemonIds } = this.state;

    if (!caughtPokemonIds) return <Loader text />;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          {this.state.pokemons.map(pokemon => {
            const isAlreadyCaught = caughtPokemonIds.has(pokemon.id);
            const cardActions = (
              <CardActions className={classes.actions}>
                <Button
                  disabled={isAlreadyCaught}
                  variant="outlined"
                  size="medium"
                  color="primary"
                  onClick={
                    isAlreadyCaught
                      ? null
                      : this.catchPokemon.bind(this, pokemon.id, pokemon.name)
                  }
                >
                  Поймать
                </Button>
              </CardActions>
            );
            return (
              <CaughtPokemon
                key={pokemon.id}
                pokemonId={pokemon.id}
                name={pokemon.name}
                cardActions={cardActions}
              />
            );
          })}
        </Grid>
        <div
          className={classes.nextPageButtonWrapper}
          ref={el => (this.endOfPage = el)}
        >
          <Button
            disabled={this.state.isNextPageLoading}
            variant="contained"
            color="primary"
            className={classes.nextPageButton}
            onClick={this.handleNext}
          >
            Хочу больше
          </Button>
          {this.state.isNextPageLoading && (
            <Loader className={classes.nextPageButtonLoader} size={24} />
          )}
        </div>
      </div>
    );
  }
}

PokemonsList.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PokemonsList);
