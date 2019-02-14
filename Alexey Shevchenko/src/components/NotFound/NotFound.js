import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import './NotFound.css';
import {Link} from 'react-router-dom';

const styles = {
	card: {
		minWidth: 275,
	},
	errNum: {
		color: 'red'
	},
	errText: {
		marginBottom: 12,
	}
};

class NotFound extends React.Component {
	render() {
		const {classes} = this.props;

		return (
			<div className={'Not-found'}>
				<Card className={classes.card}>
					<CardContent className={'Card'}>
						<Typography
							variant="h2"
							className={classes.errNum}
						>
							404
						</Typography>
						<Typography
							className={classes.errText}
							color="textSecondary">
							А это что за покемон? :)
						</Typography>
						<Button
							variant="contained"
							color="primary"
							className={'btn'}
							component={Link}
							to="/">
							Go to home page
						</Button>
					</CardContent>
				</Card>
			</div>
		);
	}
}

NotFound.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);