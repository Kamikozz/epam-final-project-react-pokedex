import React from "react";
import { Link } from "react-router-dom";
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

import config from "../../config/config.json";
import "./List.css";

const styles = theme => ({
  root: {
    margin: "20px",
    flexGrow: 1
  },
  card: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  actions: {
    justifyContent: "center"
  },
  media: {
    height: 400
  }
});

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: 1,
      pokemons: [],
      caughtPokemons: [],
      page: 1
    };
    this.handleNext = this.handleNext.bind(this);
    this.getPokemonsList = this.getPokemonsList.bind(this);
    this.getCaughtPokemonsList = this.getCaughtPokemonsList.bind(this);
    this.catchPokemon = this.catchPokemon.bind(this);
  }

  handleNext() {
    const nextPageNo = this.state.page + 1;
    this.getPokemonsList(nextPageNo);
    this.getCaughtPokemonsList(nextPageNo);
    this.setState({ page: nextPageNo });
  }

  getPokemonsList(page) {
    fetch(`${config.host}:${config.port}/pokemons?_page=${page}&_limit=20`)
      .then(res => res.json())
      .then(newpokemons => {
        const pokemonsArr = [].concat(this.state.pokemons, newpokemons);
        this.setState({ pokemons: pokemonsArr });
        console.log(this.state.pokemons);
      })
      .catch(err => console.log(err));
  }

  getCaughtPokemonsList(page) {
    fetch(`${config.host}:${config.port}/users/${this.state.currentUserId}/
		caught_pokemons?pokemonId_gte=${1 + page * 20 - 20}&pokemonId_lte=${page * 20}`)
      .then(res => res.json())
      .then(newpokemons => {
        const caughtPokemonsArr = [].concat(
          this.state.caughtPokemons,
          newpokemons
        );
        this.setState({ caughtPokemons: caughtPokemonsArr });
        console.log(this.state.caughtPokemons);
      })
      .catch(err => console.log(err));
  }

  catchPokemon(pokemonId, name) {
    const { currentUserId: userId } = this.state;
    fetch(`${config.host}:${config.port}/users/${userId}/caught_pokemons/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        pokemonId,
        caughtDate: new Date().toLocaleString(),
        name,
      })
    });
  }

  componentDidMount() {
    console.log(this.state.pokemons.length === 0);
    if (this.state.pokemons.length === 0) {
      this.getPokemonsList(this.state.page);
      this.getCaughtPokemonsList(this.state.page);
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {this.state.pokemons.map(pokemon => (
            <Grid key={pokemon.id} item xs={12} md={6} lg={4}>
              <Card className={classes.card}>
                <CardActionArea component={Link} to={`/pokemons/${pokemon.id}`}>
                  <CardMedia
                    className={classes.media}
                    image={require("../../assets/pokemons/" +
                      pokemon.id +
                      ".png")}
                    title={pokemon.name}
                  />
                  <CardContent>
                    <Typography variant="h4" component="h4">
                      {pokemon.name + " [ID:" + pokemon.id + "]"}
                    </Typography>
                    {/*<Typography component="p">*/}
                    {/*{this.getPokemonDescription(pokemon.name)}*/}
                    {/*</Typography>*/}
                  </CardContent>
                </CardActionArea>
                <CardActions className={classes.actions}>
                  <Button
                    variant="outlined"
                    size="medium"
                    color="primary"
                    onClick={this.catchPokemon.bind(
                      this,
                      pokemon.id,
                      pokemon.name
                    )}
                  >
                    Поймать
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
        <div>
          <Button
            variant="contained"
            color="primary"
            className={"btn"}
            onClick={this.handleNext}
          >
            Хочу больше
          </Button>
        </div>
      </div>
    );
  }
}

List.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(List);
