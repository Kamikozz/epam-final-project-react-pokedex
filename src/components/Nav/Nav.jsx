import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";

import pokedexIcon from "../../assets/pokeball.png";
import "./Nav.css";

const styles = {
  root: {
    flexGrow: 1
  },
  tabsIndicator: {
    backgroundColor: "red"
  },
  tabsRoot: {
    color: "red"
  }
};

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event, selectedTabIndex) {
    this.setState({ selectedTabIndex });
  }

  render() {
    const { classes } = this.props;

    return (
      <Paper square className={classes.root}>
        <Tabs
          classes={{ root: classes.tabsRoot, indicator: classes.tabsIndicator }}
          value={this.props.selected}
          onChange={this.handleChange}
          variant="fullWidth"
        >
          <Tab
            icon={<img src={pokedexIcon} alt="Home pokedex" width="24px" />}
            label="POKEDEX"
            component={Link}
            to="/"
          />
          <Tab label="GOTCHA!" component={Link} to={"/caught_pokemons"} />
        </Tabs>
      </Paper>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Nav);
