import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import './index.css';
import App from './components/App/App';
import Nav from './components/Nav/Nav';
import NotFound from './components/NotFound/NotFound';
import CaughtPokemons from './components/CaughtPokemons/CaughtPokemons';
import Pokemon from './components/Pokemon/Pokemon';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Router>
			<Switch>
				<Route path="/" component={App}/>
				<Route component={NotFound}/>
			</Switch>
	</Router>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();