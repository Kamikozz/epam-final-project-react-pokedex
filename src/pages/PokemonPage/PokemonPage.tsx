import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { WithStyles, Grid, CardActions, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import {
  selectCaughtPokemonsItems,
  selectCaughtPokemonsIds,
  selectUserId,
  selectPokemonsIsLoading,
  selectPokemonsItems,
} from "../../store/slices";
import { Loader, PokemonItem, NotFound } from "../../components";
import {
  getPokemon as getPokemonService,
  getCaughtPokemon as getCaughtPokemonService,
  postCaughtPokemon,
} from "../../services/pokemons";
import styles from "./styles";

type IPokemonData = {
  id?: number;
  pokemonId?: number;
  name: string;
  caughtDate?: string;
} | null | undefined;

interface Props extends WithStyles<typeof styles> {
  match: any;
};

const Component = ({ classes, match }: Props) => {
  const [pokemonData, setPokemonData]: [IPokemonData, Function] = useState();
  const pokemonId = Number(match.params.id);

  const userId = useSelector(selectUserId);
  const pokemons = useSelector(selectPokemonsItems);
  const pokemonsLoading = useSelector(selectPokemonsIsLoading);
  const caughtPokemons = useSelector(selectCaughtPokemonsItems);
  const caughtPokemonsIds = useSelector(selectCaughtPokemonsIds);

  const dispatch = useDispatch();

  const getPokemon = async () => {
    // check if already cached
    let pokemon = pokemons.find((item) => item.id === pokemonId) || null;
    if (!pokemon) {
      pokemon = await getPokemonService(pokemonId);
    }
    return pokemon;
  };

  const getCaughtPokemon = async () => {
    // check if already cached
    let caughtPokemon = caughtPokemons.find((item) => item.pokemonId === pokemonId) || null;
    if (!caughtPokemon) {
      caughtPokemon = await getCaughtPokemonService(userId, pokemonId);
    }
    return caughtPokemon;
  };

  const catchPokemon = async () => {
    const newData = await postCaughtPokemon(userId, {
      pokemonId,
      caughtDate: new Date().toLocaleString(),
      name: pokemonData ? pokemonData!.name : '',
    });
    setPokemonData(newData);

    // if already cached caughtPokemons in the application
    if (caughtPokemons.length && newData) {
      caughtPokemons.push(newData);
    }
    if (caughtPokemons.length && caughtPokemonsIds) {
      caughtPokemonsIds.add(pokemonId);
    }
  };

  const getPokemonData = async () => {
    let data: IPokemonData = await getCaughtPokemon();
    if (!data) {
      data = await getPokemon();
    }
    setPokemonData(data);
  };

  useEffect(() => {
    getPokemonData();
  }, []);

  console.log("EXACT POKEMON");

  if (pokemonData === undefined) return <Loader showText />;
  if (pokemonData === null) return <NotFound />;

  const { name: pokemonName, caughtDate } = pokemonData;
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
                <Button variant="outlined" size="medium" color="primary" onClick={catchPokemon}>
                  Catch
                </Button>
              </CardActions>
            )
          }
        />
      </Grid>
    </div>
  );
};

export const PokemonPage = withStyles(styles)(Component);
