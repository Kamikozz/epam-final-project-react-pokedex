import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import PokemonItem from "../../components/PokemonItem/PokemonItem";
import Loader from "../../components/Loader/Loader";
import services from "../../services/pokemons";
import AppContext from "../../AppContext";

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

class PokemonsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isNextPageLoading: false
    };
    this.endOfPageRef = null;
    this.handleNext = this.handleNext.bind(this);
  }

  handleNext() {
    const { page, setPage } = this.context;
    setPage(page + 1);
    this.setState({ isNextPageLoading: true }, async () => {
      await this.getPokemons();
      scrollToBottom(this.endOfPageRef);
    });
  }

  async getPokemonsList() {
    const { page } = this.context;
    const newPokemons = await services.getPokemons({ page });
    const { pokemons } = this.context;
    return [].concat(pokemons, newPokemons);
  }

  async getCaughtPokemonsList() {
    let { caughtPokemons } = this.context;
    if (!caughtPokemons) {
      const { userId } = this.context;
      caughtPokemons = await services.getCaughtPokemons(userId);
    }
    return caughtPokemons;
  }

  // async getCaughtPokemonsList() {
  //   const { page } = this.context;
  //   const limit = 20;
  //   const from = 1 + (page - 1) * limit;
  //   const to = page * limit;

  //   const { caughtPokemons, setCaughtPokemons } = this.context;

  //   // Make sure that we are not loading more items, if we are already have 100 caught pokemons, but page on the Pokemon's Page is still equals to "1"
  //   if (caughtPokemons && caughtPokemons.length) {
  //     const pokemonIds = caughtPokemons.map(({ pokemonId }) => pokemonId);
  //     const maxPokemonId = Math.max(...pokemonIds);
  //     const maxPage = Math.ceil(maxPokemonId / limit);
  //     const isTheSamePage = maxPage === page;
  //     const isDataUpdated = to <= maxPokemonId;
  //     if (isTheSamePage || isDataUpdated) {
  //       return;
  //     }
  //   }

  //   const { userId } = this.context;
  //   const newCaughtPokemons = await services.getCaughtPokemons(
  //     userId,
  //     from,
  //     to
  //   );
  //   setCaughtPokemons(
  //     [].concat(caughtPokemons ? caughtPokemons : [], newCaughtPokemons)
  //   );
  // }

  async getPokemons() {
    const { setAppState } = this.context;
    const [caughtPokemons, pokemons] = await Promise.all([
      this.getCaughtPokemonsList(),
      this.getPokemonsList()
    ]);
    const caughtPokemonIds = new Set(
      caughtPokemons.map(({ pokemonId }) => pokemonId)
    );
    this.setState({
      isNextPageLoading: false
    });
    setAppState({
      caughtPokemonIds,
      caughtPokemons,
      pokemons
    });
  }

  async catchPokemon(pokemonId, name) {
    const { userId } = this.context;
    const createdCaughtPokemon = await services.postCaughtPokemon(userId, {
      pokemonId,
      caughtDate: new Date().toLocaleString(),
      name
    });
    const { caughtPokemons, caughtPokemonIds, setAppState } = this.context;
    setAppState({
      caughtPokemons: [...caughtPokemons, createdCaughtPokemon],
      caughtPokemonIds: caughtPokemonIds.add(pokemonId)
    });
  }

  componentDidMount() {
    console.log("PokemonsPage-ComponentDidMount");
    const { pokemons } = this.context;
    if (!pokemons.length) {
      console.log("GlobalState.pokemons is empty! RETRIEVING!");
      this.getPokemons();
    }
  }

  render() {
    const { classes } = this.props;
    const { caughtPokemonIds, pokemons } = this.context;

    if (!caughtPokemonIds) return <Loader text />;

    console.log("PokemonsPage-Render", this.context);

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          {pokemons.map(pokemon => {
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
                  Catch
                </Button>
              </CardActions>
            );
            return (
              <PokemonItem
                key={pokemon.id}
                pokemonId={pokemon.id}
                name={pokemon.name}
                cardActions={cardActions}
                link
              />
            );
          })}
        </Grid>
        <div
          className={classes.nextPageButtonWrapper}
          ref={el => (this.endOfPageRef = el)}
        >
          <Button
            disabled={this.state.isNextPageLoading}
            variant="contained"
            color="primary"
            className={classes.nextPageButton}
            onClick={this.handleNext}
          >
            Load more
          </Button>
          {this.state.isNextPageLoading && (
            <Loader className={classes.nextPageButtonLoader} size={24} />
          )}
        </div>
      </div>
    );
  }
}

PokemonsPage.contextType = AppContext;
PokemonsPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(PokemonsPage);