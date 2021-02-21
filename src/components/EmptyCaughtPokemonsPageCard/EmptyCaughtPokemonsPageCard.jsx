import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

import caughtPokemonImage from "../../assets/pokemon-catching.gif";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontWeight: "400"
  },
  caughtPokemonImage: {
    margin: "12px 0 0 0",
    width: "90%",
    borderRadius: "4px"
  }
};

class EmptyCaughtPokemonsPageCard extends React.Component {
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

EmptyCaughtPokemonsPageCard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(EmptyCaughtPokemonsPageCard);
