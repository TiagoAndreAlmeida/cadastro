import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch, NavLink} from 'react-router-dom';
// import {API} from './utils.js';
import './css/pure-min.css';
import './css/side-menu.css';

import BoxAuth from './components/boxAuth';
import Home from './components/home';
import BoxBook from './components/boxBook';

class App extends Component {

  render() {
    return (
      <Router>
      <div id="layout">

      <a href="#menu" id="menuLink" className="menu-link">
        <span></span>
      </a>

      <div id="menu">
          <div className="pure-menu">
              <a className="pure-menu-heading" href="#">Company</a>

              <ul className="pure-menu-list">
                  <li className="pure-menu-item"><NavLink to="/" className="pure-menu-link">Home</NavLink></li>
                  <li className="pure-menu-item"><NavLink to="/autor" className="pure-menu-link">Autor</NavLink></li>
                  <li className="pure-menu-item"><NavLink to="/livro" className="pure-menu-link">Livro</NavLink></li>
              </ul>
          </div>
      </div>

          <div id="main">
              <div className="header">
                <h1>Cadastro de Autores</h1>
                  <Switch>
                    <Route path='/' component={ Home } exact />
                    <Route path='/autor' component={ BoxAuth } />
                    <Route path='/livro' component={ BoxBook } />
                  </Switch>
              </div>
            </div>            
      </div> 
      </Router>
    );
  }
}

export default App;
