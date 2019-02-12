import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
// import tileData from './tileData';
import image1 from '../../assets/pokemons/1.png'
import image2 from '../../assets/pokemons/2.png'
import image3 from '../../assets/pokemons/3.png'
import image4 from '../../assets/pokemons/4.png'
import image5 from '../../assets/pokemons/5.png'

const styles = theme => ({
	root: {
		display: 'flex',
		flexWrap: 'nowrap',
		justifyContent: 'space-around',
		// overflow: 'hidden',
		marginTop: "40px",
	},
	gridList: {
		width: "90vw",
		height: "90%",
	},
	icon: {
		color: 'rgba(255, 255, 255, 0.54)',
	},
});

const tileData =[
	{
		img: image1,
		title: 'Image',
		author: 'kamikozz'
	},
	{
		img: image2,
		title: 'Image1',
		author: 'kamiko42zz'
	},
	{
		img: image3,
		title: 'Image2',
		author: 'kamikoz3z'
	},
	{
		img: image4,
		title: 'Image',
		author: 'kamikozz2'
	},
	{
		img: image5,
		title: 'Image',
		author: 'kamikozz1'
	},
	{
		img: image1,
		title: 'Image',
		author: 'kamikozz'
	},
	{
		img: image2,
		title: 'Image1',
		author: 'kamiko42zz'
	},
	{
		img: image3,
		title: 'Image2',
		author: 'kamikoz3z'
	},
	{
		img: image4,
		title: 'Image',
		author: 'kamikozz2'
	},
	{
		img: image5,
		title: 'Image',
		author: 'kamikozz1'
	},
	{
		img: image1,
		title: 'Image',
		author: 'kamikozz'
	},
	{
		img: image2,
		title: 'Image1',
		author: 'kamiko42zz'
	},
	{
		img: image3,
		title: 'Image2',
		author: 'kamikoz3z'
	},
	{
		img: image4,
		title: 'Image',
		author: 'kamikozz2'
	},
	{
		img: image5,
		title: 'Image',
		author: 'kamikozz1'
	},
	{
		img: image1,
		title: 'Image',
		author: 'kamikozz'
	},
	{
		img: image2,
		title: 'Image1',
		author: 'kamiko42zz'
	},
	{
		img: image3,
		title: 'Image2',
		author: 'kamikoz3z'
	},
	{
		img: image4,
		title: 'Image',
		author: 'kamikozz2'
	},
	{
		img: image1,
		title: 'Image',
		author: 'kamikozz'
	},
	{
		img: image2,
		title: 'Image1',
		author: 'kamiko42zz'
	},
	{
		img: image3,
		title: 'Image2',
		author: 'kamikoz3z'
	},
	{
		img: image4,
		title: 'Image',
		author: 'kamikozz2'
	},
	{
		img: image1,
		title: 'Image',
		author: 'kamikozz'
	},
	{
		img: image2,
		title: 'Image1',
		author: 'kamiko42zz'
	},
	{
		img: image3,
		title: 'Image2',
		author: 'kamikoz3z'
	},
	{
		img: image4,
		title: 'Image',
		author: 'kamikozz2'
	}
];
function TitlebarGridList(props) {
	const { classes } = props;

	return (
		<div className={classes.root}>
			<GridList cellHeight={180} cols={5} className={classes.gridList}>
				{
					tileData.map((tile) => (
					<GridListTile key={tile.img}>
						<img src={tile.img} alt={tile.title} />
						<GridListTileBar
							title={tile.title}
							subtitle={<span>by: {tile.author}</span>}
							actionIcon={
								<IconButton className={classes.icon}>
									<InfoIcon />
								</IconButton>
							}
						/>
					</GridListTile>
				))
				}
			</GridList>
		</div>
	);
}

TitlebarGridList.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TitlebarGridList);