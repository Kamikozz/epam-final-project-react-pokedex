import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import routes from "../../routes";
import notFoundImage from "../../assets/pokemon-meme.gif";

const styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  card: {
    minWidth: 275
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  errorStatus: {
    color: "red"
  },
  notFoundImage: {
    margin: "12px 0 12px 0",
    width: "80%",
    borderRadius: "4px"
  },
  button: {
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "red"
    }
  }
};

class NotFound extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h2" className={classes.errorStatus}>
              404
            </Typography>
            <Typography className={classes.errorText}>
              А это что за покемон? 😅
            </Typography>
            <img
              className={classes.notFoundImage}
              src={notFoundImage}
              alt="who is this pokemon meme"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              component={Link}
              to={routes.pokemonsList}
            >
              Go to home page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NotFound);
