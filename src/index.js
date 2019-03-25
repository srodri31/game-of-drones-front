import React from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter as Router } from "react-router-dom";
import "./index.css";
import App from "./App";
import Game from "./components/game";
import Winner from "./components/winner";
import * as serviceWorker from "./serviceWorker";

const routing = (
  <Router>
    <div>
      <Route path="/" exact component={App} />
      <Route path="/games/:id" exact component={Game} />
      <Route path="/games/:id/winner" component={Winner} />
    </div>
  </Router>
);

ReactDOM.render(routing, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
