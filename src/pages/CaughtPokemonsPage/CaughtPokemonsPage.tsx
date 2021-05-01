import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { WithStyles, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { PokemonItem, Loader, EmptyCaughtPokemonsPageCard } from "../../components";

import services from "../../services/pokemons";
import {
  addCaughtPokemons,
  selectCaughtPokemons,
  selectCaughtPokemonsIds,
  selectCaughtPokemonsItems,
  selectUserId,
} from "../../store/slices";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {};

const Component = ({ classes }: Props) => {
  const userId = useSelector(selectUserId);
  const caughtPokemons = useSelector(selectCaughtPokemonsItems);
  // const caughtPokemonsIds = useSelector(selectCaughtPokemonsIds);
  const dispatch = useDispatch();
  const getCaughtPokemonsList = async () => {
    if (caughtPokemons.length) return;

    const data = await services.getCaughtPokemons(userId);
    dispatch(addCaughtPokemons(data));
  };

  useEffect(() => {
    console.log("CaughtPokemonsPage-ComponentDidMount");
    getCaughtPokemonsList();
  }, []);

  if (!caughtPokemons) return <Loader showText />; // TODO: sage's loading state
  if (!caughtPokemons.length) return <EmptyCaughtPokemonsPageCard />;

  console.log("CaughtPokemonsPage-Render");

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center">
        {
          caughtPokemons.map(({ id, pokemonId, name, caughtDate}) => (
            <PokemonItem
              key={pokemonId}
              pokemonId={pokemonId}
              name={name}
              date={caughtDate}
              link
            />
          ))
        }
      </Grid>
    </div>
  );
};

export const CaughtPokemonsPage = withStyles(styles)(Component);
