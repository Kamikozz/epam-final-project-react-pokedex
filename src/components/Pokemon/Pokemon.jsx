import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";

import Loader from "../Loader/Loader";
import services from "../../services/pokemons";

const styles = theme => ({
  root: {
    margin: "20px",
    flexGrow: 1
  },
  card: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  pokemonName: {
    textTransform: "uppercase"
  },
  actions: {
    justifyContent: "center"
  },
  media: {
    height: 400,
    backgroundSize: "contain"
  },
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
  }
});

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemon: null,
      caughtPokemon: null
    };
    this.getPokemon = this.getPokemon.bind(this);
    this.getCaughtPokemon = this.getCaughtPokemon.bind(this);
    this.catchPokemon = this.catchPokemon.bind(this);
  }

  async getPokemon() {
    const pokemonId = this.props.match.params.id;
    const pokemon = await services.getPokemon(pokemonId);
    this.setState({ pokemon });
  }

  async getCaughtPokemon() {
    const pokemonId = this.props.match.params.id;
    const caughtPokemon = await services.getCaughtPokemon(pokemonId);
    this.setState({ caughtPokemon });
  }

  catchPokemon() {
    const data = {
      pokemonId: Number(this.props.match.params.id),
      caughtDate: new Date().toLocaleString(),
      name: this.state.pokemon.name
    };
    services.postCaughtPokemon(data);
    this.setState({ caughtPokemon: data });
  }

  componentDidMount() {
    this.getPokemon();
    this.getCaughtPokemon();
  }

  render() {
    const { classes } = this.props;
    const isCaughtPokemon = Boolean(this.state.caughtPokemon);
    const data = isCaughtPokemon
      ? this.state.caughtPokemon
      : this.state.pokemon;

    if (!data) return <Loader text />;

    const pokemonIdFromUrl = this.props.match.params.id;
    const pokemonImage = require(`../../assets/pokemons/${pokemonIdFromUrl}.png`);

    const { id: key, name: pokemonName, caughtDate } = data;
    const pokemonId = isCaughtPokemon ? data.pokemonId : key;
    const cardDateJsx = isCaughtPokemon ? (
      <Typography component="p">{`Caught at: ${caughtDate}`}</Typography>
    ) : null;

    const cardActionsJsx = isCaughtPokemon ? null : (
      <CardActions className={classes.actions}>
        <Button
          variant="outlined"
          size="medium"
          color="primary"
          onClick={this.catchPokemon}
        >
          Поймать
        </Button>
      </CardActions>
    );

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          <Grid key={key} item xs={10} md={6} lg={4}>
            <Badge
              className={classes.badgeWrapper}
              classes={{ badge: classes.badge }}
              color="primary"
              badgeContent={pokemonId}
              max={99999} // max pokemonId found in db.json
            >
              <Card className={classes.card}>
                <CardActionArea>
                  <CardMedia
                    className={classes.media}
                    image={pokemonImage}
                    title={pokemonName}
                  />
                  <CardContent>
                    <Typography
                      className={classes.pokemonName}
                      variant="h4"
                      component="h4"
                    >
                      {pokemonName}
                    </Typography>
                    {cardDateJsx}
                  </CardContent>
                </CardActionArea>
                {cardActionsJsx}
              </Card>
            </Badge>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Pokemon.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pokemon);
