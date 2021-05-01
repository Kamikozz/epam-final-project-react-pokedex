import React from "react";
import { Link } from "react-router-dom";

import { WithStyles, Card, CardContent, Button, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import routes from "../../routes";
import notFoundImage from "../../assets/pokemon-meme.gif";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {};

const LinkToPokemonsPage = (props: any) => <Link to={routes.pokemonsPage} {...props} />;

const NotFound = ({ classes }: Props) => {
  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Typography variant="h2" className={classes.errorStatus}>404</Typography>
          <Typography>Who's that Pokemon? 😅</Typography>
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
          >Go to home page</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(styles)(NotFound);
