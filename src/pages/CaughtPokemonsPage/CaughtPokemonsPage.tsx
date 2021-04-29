import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { WithStyles, Grid } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import { PokemonItem, Loader, EmptyCaughtPokemonsPageCard } from "../../components";

import services from "../../services/pokemons";
import { ActionType } from "../../reducer";
import { selectCaughtPokemons, selectUserId } from "../../store/slices";
import styles from "./styles";

export interface ICaughtPokemon {
  id?: number;
  pokemonId: number;
  name: string;
  caughtDate: string;
};

interface Props extends WithStyles<typeof styles> {};

const CaughtPokemonsPage = (props: Props) => {
  const userId = useSelector(selectUserId);
  let caughtPokemons = useSelector(selectCaughtPokemons);
  const dispatch = useDispatch();
  const getCaughtPokemonsList = async () => {
    if (caughtPokemons) return;

    caughtPokemons = await services.getCaughtPokemons(userId);
    dispatch({
      type: ActionType.SET_NEW_STATE,
      payload: { caughtPokemons }
    });
  };

  useEffect(() => {
    console.log("CaughtPokemonsPage-ComponentDidMount");
    getCaughtPokemonsList();
  }, []);

  if (!caughtPokemons) return <Loader showText={true} />;
  if (!caughtPokemons.length) return <EmptyCaughtPokemonsPageCard />;

  console.log("CaughtPokemonsPage-Render");

  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center">
        {
          caughtPokemons.map(({ id, pokemonId, name, caughtDate}) => (
            <PokemonItem
              key={id!}
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

export default withStyles(styles)(CaughtPokemonsPage);
