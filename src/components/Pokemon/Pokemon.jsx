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

import config from "../../config/config.json";
import './Pokemon.css';
import Loader from "../Loader/Loader";

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
    height: 400,
    backgroundSize: "contain"
  }
});

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: 1,
      pokemon: {},
      caughtPokemon: {},
      caught: false
    };
    this.getPokemon = this.getPokemon.bind(this);
    this.getCaughtPokemon = this.getCaughtPokemon.bind(this);
    this.catchPokemon = this.catchPokemon.bind(this);
  }

  getPokemon() {
    const pokemonId = this.props.match.params.id;
    console.log(this.props.match);
    const endpoint = `/pokemons/${pokemonId}`;
    const url = `${config.host}:${config.port}${endpoint}`;
    fetch(url)
      .then(res => res.json())
      .then(pokemon => {
        this.setState({ pokemon: pokemon });
      })
      .catch(err => console.log(err));
  }

  getCaughtPokemon() {
    const pokemonId = this.props.match.params.id;
    const endpoint = `/users/${this.state.currentUserId}/
		caught_pokemons`;
    const params = `?pokemonId=${pokemonId}`;
    const url = `${config.host}:${config.port}${endpoint}${params}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        const [pokemon] = data;
        this.setState({ caughtPokemon: pokemon });
        if (pokemon) {
          this.setState({ caught: true });
        }
      })
      .catch(err => console.log(err));
  }

  catchPokemon() {
    console.log("CAUGHT NEW POKEMON!");
    const pokemonId = Number(this.props.match.params.id);
    const caughtDate = new Date().toLocaleString();
    const name = this.state.pokemon.name;
    fetch(
      `${config.host}:${config.port}/users/${
        this.state.currentUserId
      }/caught_pokemons/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          pokemonId,
          caughtDate,
          name
        })
      }
    );
    this.setState({ caught: true });
  }

  componentDidMount() {
    this.getPokemon();
    this.getCaughtPokemon();
  }

  render() {
    const { classes } = this.props;
    const data = this.state.caughtPokemon
      ? this.state.caughtPokemon
      : this.state.pokemon;
    const matchParamsId = this.props.match.params.id;
    const pokemonImage = require(`../../assets/pokemons/${matchParamsId}.png`);
    const key = data.id;
    const pokemonName = data.name;
    const pokemonId = this.state.caughtPokemon ? data.pokemonId : key;
    // const cardTitle = `${pokemonName} [ID: ${pokemonId}]`;
    const cardDateJsx = this.state.caughtPokemon ? (
      <Typography component="p">{`Caught at: ${data.caughtDate}`}</Typography>

    if (!data) return <Loader />;
    ) : null;

    return (
      <div className={classes.root}>
        <Grid container spacing={24} justify="center">
          <Grid key={key} item xs={10} md={6} lg={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={pokemonImage}
                  title={pokemonName}
                />
                <CardContent>
                  <Typography variant="h4" component="h4">
                    {/* {cardTitle} */}
                    <span>{pokemonName} </span>
                    <span className="Pokemon__id">{`[ID: ${pokemonId}]`}</span>
                  </Typography>
                  {cardDateJsx}
                </CardContent>
              </CardActionArea>
              <CardActions className={classes.actions}>
                <Button
                  disabled={this.state.caught}
                  variant="outlined"
                  size="medium"
                  color="primary"
                  onClick={this.state.caughtPokemon ? null : this.catchPokemon}
                >
                  Поймать
                </Button>
              </CardActions>
            </Card>
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
