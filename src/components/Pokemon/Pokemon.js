import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import config from '../../config/config.json'

// // cross-browser-support IE11
// require('es6-promise').polyfill();
// require('isomorphic-fetch');

const styles = theme => ({
	root: {
		margin: "20px",
		flexGrow: 1,
	},
	card: {
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	actions: {
		justifyContent: 'center',
	},
	media: {
		height: 400,
	},
});

class Pokemon extends React.Component {
	// constructor(props){
	// 	super(props);
	// }

	state = {
		currentUserId: 1,
		pokemon: {},
		caughtPokemon: {},
	};

	getPokemon = () => {
		fetch(`${config.hostname}:${config.port}/pokemons/${this.props.match.params.id}`)
			.then(res => res.json())
			.then(pokemon => {
				console.log(pokemon);
				console.log(this.props.match.params.id);
				this.setState({pokemon: pokemon});
				}
			)
			.catch(err => console.log(err))
	};

	getCaughtPokemon = () => {
		fetch(`${config.hostname}:${config.port}/users/${this.state.currentUserId}/caught_pokemons?pokemonId=${this.props.match.params.id}`)
			.then(res => res.json())
			.then(pokemon => {
				console.log(pokemon);
				this.setState({caughtPokemon: pokemon});
			})
			.catch(err => console.log(err))
	};

	catchPokemon = () => {
		fetch(`${config.hostname}:${config.port}/users/${this.state.currentUserId}/caught_pokemons/`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({
				"pokemonId": this.state.pokemon.pokemonId,
				"caughtDate": new Date().toLocaleString(),
				"name": this.state.pokemon.name,
			})
		})
	};

	componentDidMount() {
			this.getPokemon();
			this.getCaughtPokemon();
		console.log(this.props.match.params.id);
	}

	render() {
		const {classes} = this.props;

		let pokemon;
		if (this.state.pokemon.id == this.state.caughtPokemon.pokemonId) {
			pokemon = this.state.caughtPokemon;
		}
		else {
			pokemon = this.state.pokemon;
		}
		return (
			<div className={classes.root}>
				<Grid container spacing={24}>
					{
						pokemon.caughtDate ? console.log("Yes") : console.log("No")
					}
					{/*{*/}
						{/*pokemon.caughtDate ?*/}
							{/*<Grid key={pokemon.pokemonId} item xs={12} md={6} lg={4}>*/}
								{/*<Card className={classes.card}>*/}
									{/*<CardActionArea>*/}
										{/*<CardMedia*/}
											{/*className={classes.media}*/}
											{/*image={require('../../assets/pokemons/' + pokemon.pokemonId + '.png')}*/}
											{/*title={pokemon.name}*/}
										{/*/>*/}
										{/*<CardContent>*/}
											{/*<Typography variant="h4" component="h4">*/}
												{/*{pokemon.name + ' [ID:' + pokemon.pokemonId + ']'}*/}
											{/*</Typography>*/}
										{/*</CardContent>*/}
									{/*</CardActionArea>*/}
									{/*<CardActions className={classes.actions}>*/}
										{/*<Button disabled variant="outlined" size="medium" color="primary">*/}
											{/*Поймать*/}
										{/*</Button>*/}
									{/*</CardActions>*/}
								{/*</Card>*/}
							{/*</Grid>*/}
							{/*:*/}
							{/*<Grid key={pokemon.id} item xs={12} md={6} lg={4}>*/}
								{/*<Card className={classes.card}>*/}
									{/*<CardActionArea>*/}
										{/*<CardMedia*/}
											{/*className={classes.media}*/}
											{/*image={require('../../assets/pokemons/' + this.state.pokemon.id + '.png')}*/}
											{/*title={pokemon.name}*/}
										{/*/>*/}
										{/*<CardContent>*/}
											{/*<Typography variant="h4" component="h4">*/}
												{/*{pokemon.name + ' [ID:' + pokemon.id + ']'}*/}
											{/*</Typography>*/}
										{/*</CardContent>*/}
									{/*</CardActionArea>*/}
									{/*<CardActions className={classes.actions}>*/}
										{/*<Button variant="outlined" size="medium" color="primary" onClick={this.catchPokemon}>*/}
											{/*Поймать*/}
										{/*</Button>*/}
									{/*</CardActions>*/}
								{/*</Card>*/}
							{/*</Grid>*/}


					{/*}*/}
				</Grid>
			</div>
		);
	}
}

Pokemon.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pokemon);
