import React from "react";
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
    backgroundSize: "contain"
  },
  caughtPokemonId: {
    display: "inline-block"
  }
});

class CaughtPokemon extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { classes } = this.props;
    const { key, pokemonId, name, date, cardActions } = this.props;
    const pokemonImage = require(`../../assets/pokemons/${pokemonId}.png`);
    const cardCaughtDateJsx = date ? (
      <Typography gutterBottom component="p">
        {`Caught at: ${date}`}
      </Typography>
    ) : null;
    return (
      <Grid key={key} item xs={10} md={6} lg={4}>
        <Card className={classes.card}>
          <CardActionArea component={Link} to={`/pokemons/${pokemonId}`}>
            <CardMedia
              className={classes.media}
              image={pokemonImage}
              title={name}
            />
            <CardContent>
              <Typography variant="h4" component="h4">
                <span>{name} </span>
                <span
                  className={classes.caughtPokemonId}
                >{`[ID: ${pokemonId}]`}</span>
              </Typography>
              {cardCaughtDateJsx}
              {/*<Typography component="p">*/}
              {/*{this.getPokemonDescription(pokemon.name)}*/}
              {/*</Typography>*/}
            </CardContent>
          </CardActionArea>
          {cardActions}
        </Card>
      </Grid>
    );
  }
}

export default withStyles(styles)(CaughtPokemon);
