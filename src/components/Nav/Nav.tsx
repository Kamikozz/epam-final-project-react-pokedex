import React from "react";
import { Link } from "react-router-dom";

import { WithStyles, Paper, Tabs, Tab } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";

import pokedexIcon from "../../assets/pokeball.png";
import caughtPokemonsIcon from "../../assets/pokeball3.png";
import routes from "../../routes";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {
  selected: number;
};

const LinkToPokemonsPage = (props: any) => <Link to={routes.pokemonsPage} {...props} />;
const LinkToCaughtPokemonsPage = (props: any) => <Link to={routes.caughtPokemonsPage} {...props} />;

const Nav = ({ classes, selected }: Props) => {
  return (
    <Paper square className={classes.root}>
      <Tabs
        classes={{
          root: classes.tabsRoot,
          indicator: classes.tabsIndicator,
        }}
        value={selected}
        variant="fullWidth"
      >
        <Tab
          icon={<img src={pokedexIcon} alt="Home pokedex" width="24px" />}
          label="POKEDEX"
          component={LinkToPokemonsPage}
        />
        <Tab
          icon={<img src={caughtPokemonsIcon} alt="Caught pokemons" width="24px" />}
          label="GOTCHA!"
          component={LinkToCaughtPokemonsPage}
        />
      </Tabs>
    </Paper>
  );
};

export default withStyles(styles)(Nav);
