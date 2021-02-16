import React from "react";
// import PropTypes from "prop-types";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

const styles = theme => ({
  card: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  media: {
    height: 400,
  }
});

class CaughtPokemon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { key, pokemonId, name, date } = this.props;
    const pokemonImage = require(`../../assets/pokemons/${pokemonId}.png`);
    const cardTitle = `${name} [ID: ${pokemonId}]`;
    const cardCaughtDate = `Caught at: ${date}`;
    return (
      <Grid key={key} item xs={12} md={6} lg={4}>
        <Card className={classes.card}>
          <CardActionArea component={Link} to={`/pokemons/${pokemonId}`}>
            <CardMedia
              className={classes.media}
              image={pokemonImage}
              title={name}
            />
            <CardContent>
              <Typography variant="h4" component="h4">
                {cardTitle}
              </Typography>
              <Typography gutterBottom component="p">
                {cardCaughtDate}
              </Typography>
              {/*<Typography component="p">*/}
              {/*{this.getPokemonDescription(pokemon.name)}*/}
              {/*</Typography>*/}
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(CaughtPokemon);
