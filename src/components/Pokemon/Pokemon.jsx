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
import AppContext from "../../AppContext";

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
      data: null,
      pokemonId: Number(this.props.match.params.id)
    };
    this.catchPokemon = this.catchPokemon.bind(this);
  }

  async getPokemon() {
    let pokemon;
    // check if already cached
    const { pokemons } = this.context;
    const { pokemonId } = this.state;
    if (pokemons) {
      pokemon = pokemons.find(item => item.id === pokemonId);
    }

    if (!pokemon) {
      pokemon = await services.getPokemon(pokemonId);
    }
    return pokemon;
  }

  async getCaughtPokemon() {
    let caughtPokemon;
    // check if already cached
    const { caughtPokemons } = this.context;
    const { pokemonId } = this.state;
    if (caughtPokemons) {
      caughtPokemon = caughtPokemons.find(item => item.pokemonId === pokemonId);
    }

    if (!caughtPokemon) {
      const { userId } = this.context;
      caughtPokemon = await services.getCaughtPokemon(userId, pokemonId);
    }
    return caughtPokemon;
  }

  async catchPokemon() {
    const { userId } = this.context;
    const { pokemonId } = this.state;
    const data = await services.postCaughtPokemon(userId, {
      pokemonId,
      caughtDate: new Date().toLocaleString(),
      name: this.state.data.name
    });
    this.setState({ data });

    const { caughtPokemons, caughtPokemonIds } = this.context;

    // if already cached caughtPokemons in the application
    if (caughtPokemons) {
      caughtPokemons.push(data);
      caughtPokemonIds.add(pokemonId);
    }
  }

  async getPokemonData() {
    let data = await this.getCaughtPokemon();
    if (!data) {
      data = await this.getPokemon();
    }
    this.setState({ data });
  }

  componentDidMount() {
    this.getPokemonData();
  }

  render() {
    console.log("EXACT POKEMON");
    const { data, pokemonId } = this.state;
    if (!data) return <Loader text />;

    const { classes } = this.props;
    const { name: pokemonName, caughtDate } = data;
    const pokemonImage = require(`../../assets/pokemons/${pokemonId}.png`);
    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          <Grid key={pokemonId} item xs={10} md={6} lg={4}>
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
                    {caughtDate && (
                      <Typography component="p">{`Caught at: ${caughtDate}`}</Typography>
                    )}
                  </CardContent>
                </CardActionArea>
                {!caughtDate && (
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
                )}
              </Card>
            </Badge>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Pokemon.contextType = AppContext;
Pokemon.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Pokemon);
