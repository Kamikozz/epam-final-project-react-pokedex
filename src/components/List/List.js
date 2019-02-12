import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
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
		height:400,
	},
});

class List extends React.Component {
	state= {
		currentUserId: 1,
		pokemons: [],
		caughtPokemons: [],
		page: 1
	};

	handleNext = () => {
		this.getPokemonsList(this.state.page + 1);
		this.getCaughtPokemonsList(this.state.page + 1);
		this.setState({page: this.state.page + 1});
	};

	getPokemonsList = (page) => {
		fetch(`${config.hostname}:${config.port}/pokemons?_page=${page}&_limit=20`)
			.then(res => res.json())
			.then(newpokemons => {
				const pokemonsArr = [].concat(this.state.pokemons, newpokemons);
				this.setState({pokemons: pokemonsArr});
				console.log(this.state.pokemons);
				console.log(this.state.caughtPokemons);

			})
			.catch(err => console.log(err))
	};

	getCaughtPokemonsList = (page) => {
		fetch(`${config.hostname}:${config.port}/user/${this.state.currentUserId}/caught_pokemons?pokemonId_gte=${1+page*20-20}&pokemonId_lte=${page*20}`)
			.then(res => res.json())
			.then(newpokemons => {
				const caughtPokemonsArr = [].concat(this.state.caughtPokemons, newpokemons);
				this.setState({caughtPokemons: caughtPokemonsArr});
			})
			.catch(err => console.log(err))
	};

	componentDidMount() {
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
					<Grid item xs={12} md={6} lg={4}>
						<Card className={classes.card}>
							<CardActionArea component={Link} to={`/pokemons/2`}>
								<CardMedia
									className={classes.media}
									image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
									title="Contemplative Reptile"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										Lizard
									</Typography>
									<Typography component="p">
										Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
										across all continents except Antarctica
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions className={classes.actions}>
								<Button variant="outlined" size="medium" color="primary" onClick={console.log}>
									Поймать
								</Button>
							</CardActions>
						</Card>
					</Grid>
					<Grid item xs={12} md={6} lg={4}>
						<Card className={classes.card}>
							<CardActionArea>
								<CardMedia
									className={classes.media}
									image="https://material-ui.com/static/images/cards/contemplative-reptile.jpg"
									title="Contemplative Reptile"
								/>
								<CardContent>
									<Typography gutterBottom variant="h5" component="h2">
										Lizard
									</Typography>
									<Typography component="p">
										Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
										across all continents except Antarctica
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions className={classes.actions}>
								<Button size="small" color="primary">
									Поймать
								</Button>
							</CardActions>
						</Card>
					</Grid>
				</Grid>
				<div>
					<Button variant="contained" color="primary" className={'btn'} onClick={this.handleNext}>
						Хочу больше
					</Button>
				</div>
			</div>
		);
	}
}


List.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(List);
