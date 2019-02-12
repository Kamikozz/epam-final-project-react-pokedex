import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {Link} from "react-router-dom";
import config from '../../config/config.json'

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
		height: 400
	},
});

class CaughtPokemons extends React.Component {
	state = {
		currentUserId: 1,
		caughtPokemons: [],
	};

	getCaughtPokemonsList = () => {
		fetch(`${config.hostname}:${config.port}/user/${this.state.currentUserId}/caught_pokemons`)
			.then(res => res.json())
			.then(pokemons => {
				this.setState({caughtPokemons: pokemons});
			})
			.catch(err => console.log(err))
	};

	componentDidMount() {
		this.getCaughtPokemonsList();

	}

	render() {
		const {classes} = this.props;

		return (
			<div className={classes.root}>
				<Grid container spacing={24}>
					{
						this.state.caughtPokemons.map((pokemon) => (
								<Grid key={pokemon.id} item xs={12} md={6} lg={4}>
									<Card className={classes.card}>
										<CardActionArea component={Link} to={`/pokemons/${pokemon.pokemonId}`}>
											<CardMedia
												className={classes.media}
												image={require('../../assets/pokemons/' + pokemon.pokemonId + '.png')}
												title={pokemon.name}
											/>
											<CardContent>
												<Typography gutterBottom variant="h5" component="h2">
													{pokemon.name}
												</Typography>
												<Typography component="p">
													Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
													across all continents except Antarctica
												</Typography>
											</CardContent>
										</CardActionArea>
									</Card>
								</Grid>
							)
						)
					}
				</Grid>
			</div>
		);
	}
}

CaughtPokemons.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CaughtPokemons);