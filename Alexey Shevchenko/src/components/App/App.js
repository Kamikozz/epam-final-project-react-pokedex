import React from 'react';
import './App.css';
import Nav from '../Nav/Nav';
import List from '../List/List';
import CaughtPokemons from "../CaughtPokemons/CaughtPokemons";
import NotFound from "../NotFound/NotFound";
import Pokemon from "../Pokemon/Pokemon";
import {Route, Switch} from "react-router-dom";


class App extends React.Component {

	render() {
		return (
			<div className="App">
				<Nav/>
				<section className="App-section">
					<Switch>
						<Route exact path="/" component={List} />
						<Route exact path="/pokemons/:id" component={Pokemon} />
						<Route exact path="/caught_pokemons/" component={CaughtPokemons} />
						<Route component={NotFound} />
					</Switch>
				</section>
			</div>
		);
	}
}

export default App;