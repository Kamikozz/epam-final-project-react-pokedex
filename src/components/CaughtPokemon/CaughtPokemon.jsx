import React from "react";
import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

const styles = theme => ({
  badgeWrapper: {
    display: "block",
    overflow: "hidden",
    borderRadius: "4px"
  },
  badge: {
    margin: "17px",
    padding: "25px",
    width: 0,
    fontSize: "20px",
    borderRadius: "0 50%",
    backgroundColor: "red"
  },
  card: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  media: {
    height: 300,
    backgroundSize: "contain"
  },
  pokemonName: {
    textTransform: "uppercase"
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
      <Grid key={key} item xs={10} md={4} lg={3}>
        <Badge
          className={classes.badgeWrapper}
          classes={{ badge: classes.badge }}
          color="primary"
          badgeContent={pokemonId}
        >
          <Card className={classes.card}>
            <CardActionArea component={Link} to={`/pokemons/${pokemonId}`}>
              <CardMedia
                className={classes.media}
                image={pokemonImage}
                title={name}
              />
              <CardContent>
                <Typography
                  className={classes.pokemonName}
                  variant="h4"
                  component="h4"
                >
                  {name}
                </Typography>
                {cardCaughtDateJsx}
                {/*<Typography component="p">*/}
                {/*{this.getPokemonDescription(pokemon.name)}*/}
                {/*</Typography>*/}
              </CardContent>
            </CardActionArea>

            {cardActions}
          </Card>
        </Badge>
      </Grid>
    );
  }
}

export default withStyles(styles)(CaughtPokemon);
