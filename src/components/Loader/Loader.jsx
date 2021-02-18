import React from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  },
  progressColor: {
    color: "white"
  }
});

function Loader(props) {
  const { classes } = props;
  return (
    <div className={classes.progressColor}>
      <div>LOADING</div>
      <CircularProgress
        className={classes.progress}
        color="inherit"
        size={70}
        thickness={1}
      />
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Loader);