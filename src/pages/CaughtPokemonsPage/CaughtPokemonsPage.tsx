import React, { useEffect, useContext } from "react";
import PropTypes from "prop-types";

import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import PokemonItem from "../../components/PokemonItem/PokemonItem";
import Loader from "../../components/Loader/Loader";
import services from "../../services/pokemons";
import EmptyCaughtPokemonsPageCard from "../../components/EmptyCaughtPokemonsPageCard/EmptyCaughtPokemonsPageCard";
import AppContext from "../../AppContext";
import styles from "./styles";

export interface ICaughtPokemon {
  id?: number;
  pokemonId: number;
  name: string;
  caughtDate: string;
};

interface Props extends WithStyles<typeof styles> {
  classes: {
    root: string;
  };
  key: string;
  pokemonId: string;
  name: string;
  date: string;
  cardActions: React.Component;
  link: boolean;
};

const CaughtPokemonsPage = (props: Props) => {
  const context = useContext(AppContext);
  const getCaughtPokemonsList = async () => {
    let { caughtPokemons } = context;
    if (caughtPokemons) return;

    const { userId, setAppState } = context;
    caughtPokemons = await services.getCaughtPokemons(userId);
    setAppState({
      caughtPokemons,
    });
  };

  useEffect(() => {
    console.log("CaughtPokemonsPage-ComponentDidMount");
    getCaughtPokemonsList();
  }, []);

  const { caughtPokemons } = context;

  if (!caughtPokemons) return <Loader text />;
  if (!caughtPokemons.length) return <EmptyCaughtPokemonsPageCard />;

  console.log("CaughtPokemonsPage-Render", context);

  const { classes } = props;

  return (
    <div className={classes.root}>
      <Grid container spacing={24} justify="center">
        {caughtPokemons.map((pokemon: ICaughtPokemon) => (
          <PokemonItem
            key={pokemon.id!}
            pokemonId={pokemon.pokemonId}
            name={pokemon.name}
            date={pokemon.caughtDate}
            link
          />
        ))}
      </Grid>
    </div>
  );
};

CaughtPokemonsPage.propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CaughtPokemonsPage);
