import React, { useState } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { WithStyles } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import pokedexIcon from "../../assets/pokeball.png";
import caughtPokemonsIcon from "../../assets/pokeball3.png";
import routes from "../../routes";
import styles from "./styles";

interface Props extends WithStyles<typeof styles> {
  selected: number;
  classes: {
    root: string;
    tabsRoot: string;
    tabsIndicator: string;
  };
};

const LinkToPokemonsPage = (props: any) => <Link to={routes.pokemonsPage} {...props} />;
const LinkToCaughtPokemonsPage = (props: any) => <Link to={routes.caughtPokemonsPage} {...props} />;

const Nav = (props: Props) => {
  const [selectedTabIndex, setSelectedTabIndex] = useState(props.selected);
  const handleChange = (event: any, selectedTabIndex: number) => {
    setSelectedTabIndex(selectedTabIndex);
  };
  const { classes } = props;
  return (
    <Paper square className={classes.root}>
      <Tabs
        classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
        value={selectedTabIndex}
        onChange={handleChange}
        variant="fullWidth"
      >
        <Tab
          icon={<img src={pokedexIcon} alt="Home pokedex" width="24px" />}
          label="POKEDEX"
          component={LinkToPokemonsPage}
        />
        <Tab
          icon={
            <img
              src={caughtPokemonsIcon}
              alt="Caught pokemons"
              width="24px"
            />
          }
          label="GOTCHA!"
          component={LinkToCaughtPokemonsPage}
        />
      </Tabs>
    </Paper>
  );
};

Nav.propTypes = {
  classes: PropTypes.object.isRequired
} as any;

export default withStyles(styles)(Nav);
