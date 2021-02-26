import { createStyles } from "@material-ui/core";

const styles = () => createStyles({
  root: {
    textAlign: "center"
  },
  main: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100%",
    minHeight: "calc(100vh - 72px)",
    color: "white",
    fontSize: "calc(10px + 2vmin)",
    backgroundColor: "#282c34"
  }
});

export default styles;
