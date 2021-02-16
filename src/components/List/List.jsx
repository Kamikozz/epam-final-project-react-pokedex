import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import config from "../../config/config.json";
import "./List.css";
import CaughtPokemon from "../CaughtPokemons/CaughtPokemon";

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
  }
});

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: 1,
      pokemons: [],
      caughtPokemons: [],
      page: 1,
      pokemonIds: null
    };
    this.handleNext = this.handleNext.bind(this);
    this.getPokemonsList = this.getPokemonsList.bind(this);
    this.getCaughtPokemonsList = this.getCaughtPokemonsList.bind(this);
  }

  handleNext() {
    const nextPageNo = this.state.page + 1;
    this.getPokemonsList(nextPageNo);
    this.getCaughtPokemonsList(nextPageNo);
    this.setState({ page: nextPageNo });
  }

  getPokemonsList(page) {
    const endpoint = "/pokemons";
    const params = `?_page=${page}&_limit=20`;
    const url = `${config.host}:${config.port}${endpoint}${params}`;
    return fetch(url)
      .then(res => res.json())
      .then(newpokemons => {
        const pokemonsArr = [].concat(this.state.pokemons, newpokemons);
        this.setState({ pokemons: pokemonsArr });
        // console.log(this.state.pokemons);
      })
      .catch(err => console.log(err));
  }

  getCaughtPokemonsList(page) {
    const endpoint = `/users/${this.state.currentUserId}/
		caught_pokemons`;
    const params = `?pokemonId_gte=${1 + page * 20 - 20}&pokemonId_lte=${page *
      20}`;
    const url = `${config.host}:${config.port}${endpoint}${params}`;
    return fetch(url)
      .then(res => res.json())
      .then(newpokemons => {
        const caughtPokemonsArr = [].concat(
          this.state.caughtPokemons,
          newpokemons
        );
        this.setState({ caughtPokemons: caughtPokemonsArr });
        // console.log(this.state.caughtPokemons);
      })
      .catch(err => console.log(err));
  }

  catchPokemon(pokemonId, name) {
    console.log("Пойман покемон из List.jsx");
    const endpoint = `/users/${this.state.currentUserId}/
		caught_pokemons`;
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
      const pokemonIds = state.pokemonIds.add(pokemonId);
      return {
        pokemonIds
      };
    });
  }

  async componentDidMount() {
    console.log("componentDidMount");
    await this.getCaughtPokemonsList(this.state.page);
    await this.getPokemonsList(this.state.page);
    this.setState({
      pokemonIds: new Set(
        this.state.caughtPokemons.map(item => {
          return item.pokemonId;
        })
      )
    });
  }

  render() {
    const { classes } = this.props;
    const { pokemonIds } = this.state;

    if (!pokemonIds) return <div>LOADING</div>;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          {this.state.pokemons.map(pokemon => {
            const isAlreadyCaught = pokemonIds.has(pokemon.id);
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
        <div>
          <Button
            variant="contained"
            color="primary"
            className={"btn"}
            onClick={this.handleNext}
          >
            Хочу больше
          </Button>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(List);
