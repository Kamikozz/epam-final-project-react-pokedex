import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

import routes from "../../routes";
import notFoundImage from "../../assets/pokemon-meme.gif";

const styles = createStyles({
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
});

interface Props extends WithStyles<typeof styles> {
  classes: {
    root: string;
    card: string;
    cardContent: string;
    errorStatus: string;
    notFoundImage: string;
    button: string;
  };
};

const LinkToPokemonsPage = (props: any) => <Link to={routes.pokemonsPage} {...props} />;
class NotFound extends React.Component<Props> {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <Card className={classes.card}>
          <CardContent className={classes.cardContent}>
            <Typography variant="h2" className={classes.errorStatus}>
              404
            </Typography>
            <Typography>
              Who's that Pokemon? 😅
            </Typography>
            <img
              className={classes.notFoundImage}
              src={notFoundImage}
              alt="who is that pokemon meme"
            />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              component={LinkToPokemonsPage}
            >
              Go to home page
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

(NotFound as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(NotFound);
