import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { WithStyles, Grid, CardActions, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import {
  fetchPaginatedPokemons,
  fetchCaughtPokemons,
  fetchNextPagePokemons,
  addCaughtPokemon,
  selectCaughtPokemonsItems,
  selectPage,
  selectUserId,
  selectPokemonsItems,
  selectPokemonsIsLoading,
  selectCaughtPokemonsIsLoading,
} from '../../store/slices';

import {
  PokemonItem,
  Loader,
} from "../../components";

import { postCaughtPokemon } from "../../services/pokemons";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {};

const Component = ({ classes }: Props) => {
  const userId = useSelector(selectUserId);
  const page = useSelector(selectPage);
  const pokemons = useSelector(selectPokemonsItems);
  const pokemonsLoading = useSelector(selectPokemonsIsLoading);
  const caughtPokemons = useSelector(selectCaughtPokemonsItems);
  const caughtPokemonsLoading = useSelector(selectCaughtPokemonsIsLoading);
  const endOfPageRef = useRef(null);
  const dispatch = useDispatch();

  const handleNext = () => dispatch(fetchNextPagePokemons());

  const scrollPage = () => {
    const element = endOfPageRef.current as Element | null;
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
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

  const getPokemons = () => {
    dispatch(fetchPaginatedPokemons({ page }));
    if (!caughtPokemons.length) {
      dispatch(fetchCaughtPokemons());
    }
  };

  const catchPokemon = async (pokemonId: number, name: string) => {
    const createdCaughtPokemon = await postCaughtPokemon(userId, {
      pokemonId,
      caughtDate: new Date().toLocaleString(),
      name,
    });
    if (createdCaughtPokemon) {
      dispatch(addCaughtPokemon(createdCaughtPokemon));
    }
  };

  useEffect(() => {
    console.log("PokemonsPage-ComponentDidMount");
    if (!pokemons.length) {
      console.log("PokemonsPage-PokemonsEmpty-RETRIEVING!");
      getPokemons();
    }
  }, []);

  useEffect(() => {
    if (pokemonsLoading) return;
    scrollPage();
  }, [pokemonsLoading]);

  if (caughtPokemonsLoading) return <Loader showText />;

  console.log("PokemonsPage-Render");

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center">
        {
          pokemons.map(({ id, name }) => {
            const isAlreadyCaught = Boolean(caughtPokemons.find(({pokemonId}) => id === pokemonId));
            const handleCatch = () => {
              catchPokemon(id, name);
            };
            const cardActions = (
              <CardActions className={classes.actions}>
                <Button
                  disabled={isAlreadyCaught}
                  variant="outlined"
                  size="medium"
                  color="primary"
                  onClick={ isAlreadyCaught ? undefined : handleCatch }
                >
                  Catch
                </Button>
              </CardActions>
            );
            return (
              <PokemonItem key={id} pokemonId={id} name={name} cardActions={cardActions} link />
            );
          })
        }
      </Grid>
      <div className={classes.nextPageButtonWrapper} ref={endOfPageRef}>
        <Button
          className={classes.nextPageButton}
          disabled={pokemonsLoading}
          variant="contained"
          color="primary"
          onClick={handleNext}
        >Load more</Button>
        {
          pokemonsLoading && (<Loader className={classes.nextPageButtonLoader} size={24} />)
        }
      </div>
    </div>
  );
};

export const PokemonsPage = withStyles(styles)(Component);
