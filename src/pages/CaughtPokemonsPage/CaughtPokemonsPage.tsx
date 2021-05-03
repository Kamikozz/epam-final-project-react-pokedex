import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { WithStyles, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { PokemonItem, Loader, EmptyCaughtPokemonsPageCard } from "../../components";
import {
  fetchCaughtPokemons,
  selectCaughtPokemonsItems,
  selectCaughtPokemonsIsLoading,
} from "../../store/slices";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {};

const Component = ({ classes }: Props) => {
  const caughtPokemons = useSelector(selectCaughtPokemonsItems);
  const caughtPokemonsLoading = useSelector(selectCaughtPokemonsIsLoading);
  const dispatch = useDispatch();

  const getCaughtPokemons = () => {
    if (caughtPokemons.length) return; // check for cache
    dispatch(fetchCaughtPokemons());
  };

  useEffect(() => {
    console.log("CaughtPokemonsPage-ComponentDidMount");
    getCaughtPokemons();
  }, []);

  if (caughtPokemonsLoading) return <Loader showText />;
  if (!caughtPokemons.length) return <EmptyCaughtPokemonsPageCard />;

  console.log("CaughtPokemonsPage-Render");

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center">
        {
          caughtPokemons.map(({ id, pokemonId, name, caughtDate}) => (
            <PokemonItem
              key={pokemonId} pokemonId={pokemonId} name={name} date={caughtDate} link
            />
          ))
        }
      </Grid>
    </div>
  );
};

export const CaughtPokemonsPage = withStyles(styles)(Component);
