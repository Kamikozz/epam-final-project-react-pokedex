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
	state = {
		currentUserId: 1,
		pokemon: {},
		caughtPokemon: {},
		caught: false
	};

	getPokemon = () => {
		fetch(`${config.hostname}:${config.port}/pokemons/${this.props.match.params.id}`)
			.then(res => res.json())
			.then(pokemon => {
					this.setState({pokemon: pokemon});
				}
			)
			.catch(err => console.log(err))
	};

	getCaughtPokemon = () => {
		fetch(`${config.hostname}:${config.port}/users/${this.state.currentUserId}/
		caught_pokemons?pokemonId=${this.props.match.params.id}`)
			.then(res => res.json())
			.then(pokemon => {
				this.setState({caughtPokemon: pokemon[0]});
				if (pokemon[0]) {
					this.setState({caught: true});
				}
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
				"pokemonId": +this.props.match.params.id,
				"caughtDate": new Date().toLocaleString(),
				"name": this.state.pokemon.name
			})
		});
		this.setState({caught: true});
	};

	componentDidMount() {
		this.getPokemon();
		this.getCaughtPokemon();
	}

	render() {
		const {classes} = this.props;
		return (
			<div className={classes.root}>
				<Grid container spacing={24}>
					{
						this.state.caughtPokemon ?
							<Grid key={this.state.caughtPokemon.id} item xs={12} md={12} lg={12}>
								<Card className={classes.card}>
									<CardActionArea>
										<CardMedia
											className={classes.media}
											image={require('../../assets/pokemons/' + this.props.match.params.id + '.png')}
											title={this.state.caughtPokemon.name}
										/>
										<CardContent>
											<Typography variant="h4" component="h4">
												{this.state.caughtPokemon.name + ' [ID:' + this.state.caughtPokemon.pokemonId + ']'}
											</Typography>
											<Typography component="p">
												{
													'Caught at: ' + this.state.caughtPokemon.caughtDate
												}
											</Typography>
										</CardContent>
									</CardActionArea>
									<CardActions className={classes.actions}>
										<Button disabled={ this.state.caught } variant="outlined" size="medium" color="primary">
											Поймать
										</Button>
									</CardActions>
								</Card>
							</Grid>
							:
							<Grid key={this.state.pokemon.id} item xs={12} md={12} lg={12}>
								<Card className={classes.card}>
									<CardActionArea>
										<CardMedia
											className={classes.media}
											image={require('../../assets/pokemons/' + this.props.match.params.id + '.png')}
											title={this.state.pokemon.name}
										/>
										<CardContent>
											<Typography variant="h4" component="h4">
												{this.state.pokemon.name + ' [ID:' + this.state.pokemon.id + ']'}
											</Typography>
										</CardContent>
									</CardActionArea>
									<CardActions className={classes.actions}>
										<Button
											disabled={this.state.caught}
											variant="outlined"
											size="medium"
											color="primary"
											onClick={this.catchPokemon}>
											Поймать
										</Button>
									</CardActions>
								</Card>
							</Grid>
					}
				</Grid>
			</div>
		);
	}
}

Pokemon.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Pokemon);
