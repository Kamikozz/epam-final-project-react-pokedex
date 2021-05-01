import React from "react";

import { WithStyles, Card, CardContent, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import caughtPokemonImage from "../../assets/pokemon-catching.gif";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {};

const EmptyCaughtPokemonsPageCard = ({ classes }: Props) => {
  return (
    <div className={classes.root}>
      <Card>
        <CardContent className={classes.cardContent}>
          <Typography variant="h5" className={classes.text}>
            Need to catch more pokemons
          </Typography>
          <img
            className={classes.caughtPokemonImage}
            src={caughtPokemonImage}
            alt="pokeball catches wild pokemon"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(EmptyCaughtPokemonsPageCard);
