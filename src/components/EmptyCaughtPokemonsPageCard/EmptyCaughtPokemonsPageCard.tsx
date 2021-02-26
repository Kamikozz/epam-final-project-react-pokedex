import React from "react";
import PropTypes from "prop-types";

import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import caughtPokemonImage from "../../assets/pokemon-catching.gif";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {
  classes: {
    root: string;
    cardContent: string;
    text: string;
    caughtPokemonImage: string;
  };
};

class EmptyCaughtPokemonsPageCard extends React.Component<Props> {
  render() {
    const { classes } = this.props;

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
  }
}

(EmptyCaughtPokemonsPageCard as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(EmptyCaughtPokemonsPageCard);
