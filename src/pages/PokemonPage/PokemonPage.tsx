import React, { useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";

import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import CardActions from "@material-ui/core/CardActions";
import Button from "@material-ui/core/Button";

import Loader from "../../components/Loader/Loader";
import services from "../../services/pokemons";
import AppContext from "../../AppContext";
import PokemonItem from "../../components/PokemonItem/PokemonItem";
import { ICaughtPokemon } from "../CaughtPokemonsPage/CaughtPokemonsPage";
import styles from "./styles";

interface IData {
  id: number;
  pokemonId?: number;
  name: string;
  caughtDate?: string;
};

export interface IPokemon {
  id: number;
  name: string;
};
interface Props extends WithStyles<typeof styles> {
  classes: {
    root: string;
    actions: string;
  };
  match: any;
};

const PokemonPage = (props: Props) => {
  let [data, setData]: [null | IData, Function] = useState(null);
  const [pokemonId] = useState(Number(props.match.params.id));
  const context = useContext(AppContext);

  const getPokemon = async () => {
    let pokemon;
    // check if already cached
    const { pokemons } = context;
    if (pokemons) {
      pokemon = pokemons.find((item: IPokemon) => item.id === pokemonId);
    }

    if (!pokemon) {
      pokemon = await services.getPokemon(pokemonId);
    }
    return pokemon;
  };

  const getCaughtPokemon = async () => {
    let caughtPokemon;
    // check if already cached
    const { caughtPokemons } = context;
    if (caughtPokemons) {
      caughtPokemon = caughtPokemons.find((item: ICaughtPokemon) => item.pokemonId === pokemonId);
    }

    if (!caughtPokemon) {
      const { userId } = context;
      caughtPokemon = await services.getCaughtPokemon(userId, pokemonId);
    }
    return caughtPokemon;
  };

  const catchPokemon = async () => {
    const { userId } = context;
    const newData = await services.postCaughtPokemon(userId, {
      pokemonId,
      caughtDate: new Date().toLocaleString(),
      name: data ? data.name : ''
    });
    setData(newData);

    const { caughtPokemons, caughtPokemonIds } = context;

    // if already cached caughtPokemons in the application
    if (caughtPokemons && newData) {
      caughtPokemons.push(newData);
    }
    if (caughtPokemons && caughtPokemonIds) {
      caughtPokemonIds.add(pokemonId);
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
    setData(data);
  };

  useEffect(() => {
    getPokemonData();
  }, []);

  console.log("EXACT POKEMON");

  if (!data) return <Loader text />;

  const { classes } = props;
  const { name: pokemonName, caughtDate } = data;
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

PokemonPage.propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(PokemonPage);
