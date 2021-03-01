import React, { useState, useContext, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import PokemonItem from "../../components/PokemonItem/PokemonItem";
import Loader from "../../components/Loader/Loader";
import services from "../../services/pokemons";
import { AppContext, ActionType } from "../../reducer";
import { IPokemon } from "../PokemonPage/PokemonPage";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {
  classes: {
    root: string;
    actions: string;
    nextPageButtonWrapper: string;
    nextPageButton: string;
    nextPageButtonLoader: string;
  };
};

const PokemonsPage = (props: Props) => {
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const endOfPageRef = useRef(null);
  const { dispatch, state } = useContext(AppContext);

  const handleNext = () => {
    dispatch({ type: ActionType.NEXT_PAGE });
    setIsNextPageLoading(true);
  };

  const getPokemonsAndScroll = async () => {
    await getPokemons();
    const element = endOfPageRef.current as Element | null;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const getPokemonsList = async () => {
    const { page }: { page: number } = state;
    const newPokemons = await services.getPokemons({ page });
    const { pokemons } = state;
    return Array().concat(pokemons, newPokemons);
  };

  const getCaughtPokemonsList = async () => {
    let { caughtPokemons } = state;
    if (!caughtPokemons) {
      const { userId } = state;
      caughtPokemons = await services.getCaughtPokemons(userId);
    }
    return caughtPokemons;
  };

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

  const getPokemons = async () => {
    const [caughtPokemons, pokemons] = await Promise.all([
      getCaughtPokemonsList(),
      getPokemonsList()
    ]);
    const caughtPokemonIds = new Set(
      caughtPokemons!.map(({ pokemonId }: { pokemonId: number }) => pokemonId)
    );
    setIsNextPageLoading(false);
    dispatch({
      type: ActionType.SET_NEW_STATE,
      payload: {
        caughtPokemonIds,
        caughtPokemons,
        pokemons
      },
    });
  };

  const catchPokemon = async (pokemonId: number, name: string) => {
    const { userId } = state;
    const createdCaughtPokemon = await services.postCaughtPokemon(userId, {
      pokemonId,
      caughtDate: new Date().toLocaleString(),
      name
    });
    const { caughtPokemons, caughtPokemonIds } = state;
    dispatch({
      type: ActionType.SET_NEW_STATE,
      payload: {
        caughtPokemons: [...caughtPokemons!, createdCaughtPokemon!],
        caughtPokemonIds: caughtPokemonIds!.add(pokemonId)
      }
    });
  };

  useEffect(() => {
    console.log("PokemonsPage-ComponentDidMount");
    const { pokemons } = state;
    if (!pokemons.length) {
      console.log("GlobalState.pokemons is empty! RETRIEVING!");
      getPokemons();
    }
  }, []);

  useEffect(() => {
    if (!isNextPageLoading) return;
    getPokemonsAndScroll();
  }, [isNextPageLoading]);

  const { classes } = props;
  const { caughtPokemonIds, pokemons } = state;

  if (!caughtPokemonIds) return <Loader text />;

  console.log("PokemonsPage-Render", state);

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center">
        {pokemons.map((pokemon: IPokemon) => {
          const isAlreadyCaught = caughtPokemonIds.has(pokemon.id);
          const clickHandler = isAlreadyCaught
            ? undefined
            : () => {
            catchPokemon(pokemon.id, pokemon.name);
          };
          const cardActions = (
            <CardActions className={classes.actions}>
              <Button
                disabled={isAlreadyCaught}
                variant="outlined"
                size="medium"
                color="primary"
                onClick={clickHandler}
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
        ref={endOfPageRef}
      >
        <Button
          disabled={isNextPageLoading}
          variant="contained"
          color="primary"
          className={classes.nextPageButton}
          onClick={handleNext}
        >
          Load more
        </Button>
        {isNextPageLoading && (
          <Loader className={classes.nextPageButtonLoader} size={24} />
        )}
      </div>
    </div>
  );
};

PokemonsPage.propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(PokemonsPage);
