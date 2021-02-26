import { createStyles } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";

const styles = (theme: Theme) => createStyles({
  badgeWrapper: {
    display: "block",
    overflow: "hidden",
    borderRadius: "4px"
  },
  badge: {
    margin: "17px",
    padding: "25px",
    width: 0,
    fontSize: "20px",
    borderRadius: "0 50%",
    backgroundColor: "red"
  },
  card: {
    textAlign: "center",
    color: theme.palette.text.secondary
  },
  media: {
    height: 300,
    backgroundSize: "contain"
  },
  pokemonName: {
    textTransform: "uppercase"
  }
});

export default styles;
