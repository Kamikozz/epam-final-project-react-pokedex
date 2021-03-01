import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import './polyfills';
import * as serviceWorker from './serviceWorker';

import App from './components/App/App';
import './index.css';
import routes from "./routes";

ReactDOM.render(
  <Router>
    <Switch>
      <Route path={routes.pokemonsPage} component={App} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
