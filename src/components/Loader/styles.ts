import { createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
  progress: {
    margin: theme.spacing.unit * 2
  },
  progressColor: {
    color: "white"
  }
});

export default styles;
