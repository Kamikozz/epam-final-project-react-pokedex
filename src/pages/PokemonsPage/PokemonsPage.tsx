import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux'

import { WithStyles, Grid, CardActions, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import {
  nextPage,
  addCaughtPokemon,
  selectCaughtPokemons,
  selectCaughtPokemonsItems,
  selectCaughtPokemonsIds,
  selectPage,
  selectPokemons,
  selectUserId,
} from '../../store/slices';

import {
  PokemonItem,
  Loader,
} from "../../components";

import services from "../../services/pokemons";
import { ActionType } from "../../reducer";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {};

const Component = (props: Props) => {
  const userId = useSelector(selectUserId);
  const page = useSelector(selectPage);
  const pokemons = useSelector(selectPokemons);
  let caughtPokemons = useSelector(selectCaughtPokemonsItems);
  const caughtPokemonsIds = useSelector(selectCaughtPokemonsIds);
  const [isNextPageLoading, setIsNextPageLoading] = useState(false);
  const endOfPageRef = useRef(null);
  const dispatch = useDispatch();

  const handleNext = () => {
    dispatch(nextPage());
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
    const newPokemons = await services.getPokemons({ page });
    return Array().concat(pokemons, newPokemons);
  };

  const getCaughtPokemonsList = async () => {
    if (!caughtPokemons.length) {
      // TODO: need DISPATCH
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
      getPokemonsList(),
    ]);
    const caughtPokemonsIds = new Set(
      caughtPokemons.map(({ pokemonId }: { pokemonId: number }) => pokemonId)
    );
    setIsNextPageLoading(false);
    dispatch({
      type: ActionType.SET_NEW_STATE,
      payload: {
        caughtPokemonsIds,
        caughtPokemons,
        pokemons
      },
    });
  };

  const catchPokemon = async (pokemonId: number, name: string) => {
    const createdCaughtPokemon = await services.postCaughtPokemon(userId, {
      pokemonId,
      caughtDate: new Date().toLocaleString(),
      name,
    });

    if (createdCaughtPokemon) {
      // TODO: add Sage's on addCaughtPokemon automatically add record to ids field
      dispatch(addCaughtPokemon(createdCaughtPokemon));
    }
    // dispatch({
    //   type: ActionType.SET_NEW_STATE,
    //   payload: {
    //     caughtPokemons: [...caughtPokemons, createdCaughtPokemon!],
    //     caughtPokemonsIds: caughtPokemonsIds!.add(pokemonId)
    //   }
    // });
  };

  useEffect(() => {
    console.log("PokemonsPage-ComponentDidMount");
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

  if (!caughtPokemonsIds) return <Loader showText />;

  console.log("PokemonsPage-Render");

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center">
        {pokemons.map((pokemon) => {
          const isAlreadyCaught = caughtPokemonsIds.has(pokemon.id);
          const handleClick = () => {
            catchPokemon(pokemon.id, pokemon.name);
          };
          const cardActions = (
            <CardActions className={classes.actions}>
              <Button
                disabled={isAlreadyCaught}
                variant="outlined"
                size="medium"
                color="primary"
                onClick={ isAlreadyCaught ? handleClick : undefined }
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
      <div className={classes.nextPageButtonWrapper} ref={endOfPageRef}>
        <Button
          className={classes.nextPageButton}
          disabled={isNextPageLoading}
          variant="contained"
          color="primary"
          onClick={handleNext}
        >Load more</Button>
        {
          isNextPageLoading && (<Loader className={classes.nextPageButtonLoader} size={24} />)
        }
      </div>
    </div>
  );
};

export const PokemonsPage = withStyles(styles)(Component);
