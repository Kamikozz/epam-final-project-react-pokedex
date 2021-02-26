import { createStyles } from "@material-ui/core";

const styles = createStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center"
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontWeight: 400
  },
  caughtPokemonImage: {
    margin: "12px 0 0 0",
    width: "90%",
    borderRadius: "4px"
  }
});

export default styles;
