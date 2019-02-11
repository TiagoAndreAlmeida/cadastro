import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {
    BrowserRouter as Router,
    Route,
    Switch
  } from 'react-router-dom'

import BoxAuth from './components/boxAuth'

ReactDOM.render(
    (<Router >
        <Switch>
            <Route path="/" exact={true} component={ App } />
            <Route path="/autor" component={BoxAuth}/>
            <Route path="/livro" />
        </Switch>
    </Router>),
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
