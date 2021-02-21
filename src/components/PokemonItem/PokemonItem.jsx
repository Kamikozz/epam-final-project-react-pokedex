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

class PokemonItem extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
      classes,
      key,
      pokemonId,
      name,
      date,
      cardActions,
      link
    } = this.props;
    const pokemonImage = require(`../../assets/pokemons/${pokemonId}.png`);
    return (
      <Grid key={key} item xs={12} sm={6} md={4} lg={3}>
        <Badge
          className={classes.badgeWrapper}
          classes={{ badge: classes.badge }}
          color="primary"
          badgeContent={pokemonId}
          max={99999} // max pokemonId found in db.json
        >
          <Card className={classes.card}>
            <CardActionArea
              {...(link
                ? {
                    component: Link,
                    to: `/pokemons/${pokemonId}`
                  }
                : {})}
            >
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
                {date && (
                  <Typography component="p">{`Caught at: ${date}`}</Typography>
                )}
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

export default withStyles(styles)(PokemonItem);
