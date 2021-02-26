import { createStyles } from "@material-ui/core";

const styles = createStyles({
  root: {
    margin: "20px",
    flexGrow: 1
  },
  actions: {
    justifyContent: "center"
  },
  nextPageButtonWrapper: {
    position: "relative"
  },
  nextPageButton: {
    margin: "10px 0 10px 0",
    backgroundColor: "red",
    "&:hover": {
      backgroundColor: "red"
    }
  },
  nextPageButtonLoader: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  }
});

export default styles;
