import React from "react";
import PropTypes from "prop-types";

import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

import PokemonItem from "../../components/PokemonItem/PokemonItem";
import Loader from "../../components/Loader/Loader";
import services from "../../services/pokemons";
import EmptyCaughtPokemonsPageCard from "../../components/EmptyCaughtPokemonsPageCard/EmptyCaughtPokemonsPageCard";
import AppContext from "../../AppContext";

const styles = createStyles({
  root: {
    margin: "20px",
    flexGrow: 1
  }
});

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

export interface ICaughtPokemon {
  id: number;
  pokemonId: number;
  name: string;
  caughtDate: string;
};

class CaughtPokemonsPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  async getCaughtPokemonsList() {
    let { caughtPokemons } = this.context;
    if (caughtPokemons) return;

    const { userId, setCaughtPokemons } = this.context;
    caughtPokemons = await services.getCaughtPokemons(userId);
    setCaughtPokemons(caughtPokemons);
  }

  componentDidMount() {
    console.log("CaughtPokemonsPage-ComponentDidMount");
    this.getCaughtPokemonsList();
  }

  render() {
    const { caughtPokemons } = this.context;

    if (!caughtPokemons) return <Loader text />;
    if (!caughtPokemons.length) return <EmptyCaughtPokemonsPageCard />;

    console.log("CaughtPokemonsPage-Render", this.context);

    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          {caughtPokemons.map((pokemon: ICaughtPokemon) => (
            <PokemonItem
              key={pokemon.id}
              pokemonId={pokemon.pokemonId}
              name={pokemon.name}
              date={pokemon.caughtDate}
              link
            />
          ))}
        </Grid>
      </div>
    );
  }
}

(CaughtPokemonsPage as React.ComponentClass<Props>).contextType = AppContext;
(CaughtPokemonsPage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(CaughtPokemonsPage);
