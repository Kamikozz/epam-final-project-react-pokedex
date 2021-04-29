import React from "react";

import { WithStyles, CircularProgress } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import styles from "./styles";

interface Props extends WithStyles<typeof styles> {
  className?: string;
  showText?: boolean;
  size?: number;
};

const Loader = (props: Props) => {
  const { classes, className, showText, size = 70 } = props;
  return (
    <div className={[classes.progressColor, className].join(" ")}>
      { showText && (<div>LOADING</div>) }
      <CircularProgress
        className={classes.progress}
        color="inherit"
        size={size}
        thickness={1}
      />
    </div>
  );
};

export default withStyles(styles)(Loader);
