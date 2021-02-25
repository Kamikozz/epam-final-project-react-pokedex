import React from "react";
import PropTypes from "prop-types";

import { WithStyles, createStyles } from "@material-ui/core";
import { withStyles, Theme } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme: Theme) => createStyles({
  progress: {
    margin: theme.spacing.unit * 2
  },
  progressColor: {
    color: "white"
  }
});

interface Props extends WithStyles<typeof styles> {
  className: string;
  text: string;
  size: number;
  classes: {
    progressColor: string;
    progress: string;
  };
};

function Loader(props: Props) {
  const { classes, className, text, size = 70 } = props;
  return (
    <div className={[classes.progressColor, className].join(" ")}>
      {text && <div>LOADING</div>}
      <CircularProgress
        className={classes.progress}
        color="inherit"
        size={size}
        thickness={1}
      />
    </div>
  );
}

Loader.propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(Loader);
