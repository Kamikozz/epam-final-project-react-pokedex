import React from "react";
import PropTypes from "prop-types";
// import { Link } from "react-router-dom";

import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";
// import CardActionArea from "@material-ui/core/CardActionArea";
// import CardContent from "@material-ui/core/CardContent";
// import CardMedia from "@material-ui/core/CardMedia";
// import Typography from "@material-ui/core/Typography";

import config from "../../config/config.json";
import CaughtPokemon from "./CaughtPokemon";

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

class CaughtPokemons extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUserId: 1,
      caughtPokemons: []
    };
    this.getCaughtPokemonsList = this.getCaughtPokemonsList.bind(this);
  }

  getCaughtPokemonsList() {
    fetch(
      `${config.host}:${config.port}/user/${
        this.state.currentUserId
      }/caught_pokemons`
    )
      .then(res => res.json())
      .then(pokemons => {
        this.setState({ caughtPokemons: pokemons });
      })
      .catch(err => console.log(err));
  }

  // getPokemonDescription = (name) => {
  // 	fetch(`https://www.pokemon.com/ru/pokedex/${name}`)
  // 		.then(res => res.text())
  // 		.then(body => {
  //
  // 			const regexp = /<p class="version-y\s.*\s*[\w .\n&#;,:]*<\/p>/;
  // 			const replaceRegexp = /<p class="version-y\s.*\s*|\s*<\/p>|/g;
  // 			console.log(body);
  // 			body = body.match(regexp).toString().replace(replaceRegexp, "").replace(/\n/g, " ");
  //
  // 			return body;
  // 			// var p = document.getElementById('description');
  // 			// p.innerHTML = body;
  // 		})
  // 		.catch(err => console.log(err))
  // };

  componentDidMount() {
    this.getCaughtPokemonsList();
  }

  render() {
    // <Grid key={pokemon.id} item xs={12} md={6} lg={4}>
    //           <Card className={classes.card}>
    //             <CardActionArea
    //               component={Link}
    //               to={`/pokemons/${pokemon.pokemonId}`}
    //             >
    //               <CardMedia
    //                 className={classes.media}
    //                 image={require("../../assets/pokemons/" +
    //                   pokemon.pokemonId +
    //                   ".png")}
    //                 title={pokemon.name}
    //               />
    //               <CardContent>
    //                 <Typography variant="h4" component="h4">
    //                   {pokemon.name + " [ID:" + pokemon.pokemonId + "]"}
    //                 </Typography>
    //                 <Typography gutterBottom component="p">
    //                   {"Caught at: " + pokemon.caughtDate}
    //                 </Typography>
    //                 {/*<Typography component="p">*/}
    //                 {/*{this.getPokemonDescription(pokemon.name)}*/}
    //                 {/*</Typography>*/}
    //               </CardContent>
    //             </CardActionArea>
    //           </Card>
    //         </Grid>
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Grid container spacing={24}>
          {this.state.caughtPokemons.map(pokemon => (
            <CaughtPokemon
              key={pokemon.id}
              pokemonId={pokemon.pokemonId}
              name={pokemon.name}
              date={pokemon.caughtDate}
            />
          ))}
        </Grid>
      </div>
    );
  }
}

CaughtPokemons.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CaughtPokemons);
