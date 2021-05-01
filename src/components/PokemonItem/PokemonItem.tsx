import React from "react";
import { Link } from "react-router-dom";

import {
  WithStyles,
  Grid, Card, CardActionArea, CardContent, CardMedia, Typography, Badge,
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";

interface Props extends WithStyles<typeof styles> {
  pokemonId: number;
  name: string;
  date?: string;
  cardActions?: JSX.Element | boolean;
  link?: boolean;
};

const LinkToPokemonsPage = (props: any) => <Link {...props} />;

const PokemonItem = ({ classes, pokemonId, name, date, cardActions, link }: Props) => {
  const pokemonImage = require(`../../assets/pokemons/${pokemonId}.png`);
  const cardActionAreaProps = link ? {
    component: LinkToPokemonsPage,
    to: `/pokemons/${pokemonId}`
  } : {};
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Badge
        className={classes.badgeWrapper}
        classes={{ badge: classes.badge }}
        color="primary"
        badgeContent={pokemonId}
        max={99999} // max pokemonId found in db.json
      >
        <Card className={classes.card}>
          <CardActionArea {...cardActionAreaProps}>
            <CardMedia className={classes.media} image={pokemonImage} title={name} />
            <CardContent>
              <Typography className={classes.pokemonName} variant="h4" component="h4">
                {name}
              </Typography>
              {
                date && (<Typography component="p">{`Caught at: ${date}`}</Typography>)
              }
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
};

export default withStyles(styles)(PokemonItem);
