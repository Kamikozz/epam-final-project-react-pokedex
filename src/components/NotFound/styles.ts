import { createStyles } from "@material-ui/core";

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

export default styles;
