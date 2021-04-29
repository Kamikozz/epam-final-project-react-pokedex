import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { WithStyles, Grid, CardActions, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import {
  selectPokemons,
  selectCaughtPokemons,
  selectCaughtPokemonsItems,
  selectCaughtPokemonsIds,
  selectUserId,
} from "../../store/slices";
import { Loader, PokemonItem } from "../../components";
import services from "../../services/pokemons";
import { ICaughtPokemon, IPokemon } from "../../reducer";
import styles from "./styles";

interface IData {
  id: number;
  pokemonId?: number;
  name: string;
  caughtDate?: string;
};

interface Props extends WithStyles<typeof styles> {
  match: any;
};

const Component = (props: Props) => {
  const [pokemonData, setPokemonData]: [IData | null, Function] = useState(null);
  const [pokemonId] = useState(Number(props.match.params.id));

  const userId = useSelector(selectUserId);
  const pokemons = useSelector(selectPokemons);
  const caughtPokemons = useSelector(selectCaughtPokemonsItems);
  const caughtPokemonsIds = useSelector(selectCaughtPokemonsIds);

  const dispatch = useDispatch();

  const getPokemon = async () => {
    // check if already cached
    let pokemon = pokemons.find((item: IPokemon) => item.id === pokemonId) || null;

    if (!pokemon) {
      pokemon = await services.getPokemon(pokemonId);
    }
    return pokemon;
  };

  const getCaughtPokemon = async () => {
    let caughtPokemon;
    // check if already cached
    if (caughtPokemons.length) {
      caughtPokemon = caughtPokemons.find((item: ICaughtPokemon) => item.pokemonId === pokemonId);
    }

    if (!caughtPokemon) {
      caughtPokemon = await services.getCaughtPokemon(userId, pokemonId);
    }
    return caughtPokemon;
  };

  const catchPokemon = async () => {
    const newData = await services.postCaughtPokemon(userId, {
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
    let data = await getCaughtPokemon() as IData;
    if (!data) {
      const temp = await getPokemon();
      if (temp) {
        data = temp;
      }
    }
    setPokemonData(data);
  };

  useEffect(() => {
    getPokemonData();
  }, []);

  console.log("EXACT POKEMON");

  if (!pokemonData) return <Loader showText />;

  const { classes } = props;
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
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  onClick={catchPokemon}
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
};

export const PokemonPage = withStyles(styles)(Component);
