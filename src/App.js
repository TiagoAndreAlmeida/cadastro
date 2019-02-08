import React, { Component } from 'react';
import axios from 'axios';

import CustomInput from './components/customInput'
import {API} from './utils.js';
import './css/pure-min.css';
import './css/side-menu.css';

class App extends Component {

  constructor(){
    super();
    this.state = {
      list: [],
      name: '',
      email: '',
      password: ''
    }
    this.sendData = this.sendData.bind(this);
    this.setName = this.setName.bind(this);
    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.delete = this.delete.bind(this);
    this.loadData = this.loadData.bind(this);
  }

  componentDidMount () {
    this.loadData()
  }

  async loadData () {
    try{
      const response = await axios.get('http://localhost:8000/user');
      this.setState({
        list: response.data
      })
    }
    catch(error){
      console.log(error);
    }
  }

  async sendData (event) {
    event.preventDefault();
    console.log(event)
    try {
      await axios.post('http://localhost:8000/user', {
        id: this.state.list.length+1,
        name: this.state.name,
        email: this.state.email,
        password: this.state.password
      })
      this.loadData();
    }
    catch(error){
      console.error(error)
    }
  }

  async delete (id) {
    console.log(id.value)
    // try{
    //   await axios.delete('http://localhost:8000/user/'+id, )
    // }
    // catch(error){
    //   console.log(error)
    // }
  }

  setName (event) {
    this.setState({name: event.target.value})
  }

  setEmail (event) {
    this.setState({email: event.target.value})
  }

  setPassword (event) {
    this.setState({password: event.target.value})
  }

  render() {
    return (
      <div id="layout">

    <a href="#menu" id="menuLink" className="menu-link">

        <span></span>
    </a>

    <div id="menu">
        <div className="pure-menu">
            <a className="pure-menu-heading" href="#">Company</a>

            <ul className="pure-menu-list">
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Home</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Autor</a></li>
                <li className="pure-menu-item"><a href="#" className="pure-menu-link">Livro</a></li>

            </ul>
        </div>
    </div>

        <div id="main">
            <div className="header">
              <h1>Cadastro de Autores</h1>
            </div>
            <div className="content" id="content">
              <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.sendData} method="post">
                  <CustomInput id="nome" type="text" name="name" value={this.state.name} onChange={this.setName} label="nome"/>
                  <CustomInput id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="email"/>
                  <CustomInput id="password" type="password" name="password" value={this.state.password} onChange={this.setPassword} label="senha"/>
                  <div className="pure-control-group">                                  
                    <label></label> 
                    <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                  </div>
                </form>             

              </div>  
              <div>            
                <table className="pure-table">
                  <thead>
                    <tr>
                      <th>Nome</th>
                      <th>email</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.list.map( (item) => {
                      return (
                      <tr key={item.id}>
                        <td>{item.name}</td>                
                        <td>{item.email}</td>
                        <td><button className="pure-button" onClick= {this.delete} >excluir</button></td>                
                      </tr>
                      )
                    })}
                  </tbody>
                </table> 
              </div>             
            </div>
          </div>            
    </div> 
    );
  }
}

export default App;
