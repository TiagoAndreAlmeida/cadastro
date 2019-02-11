import React, {Component} from 'react';
import axios from 'axios';
import PubSub from 'pubsub-js'

import CustomInput from './customInput';
import CustomButton from './customButton';

class FormAuth extends Component {

    constructor () {
        super()
        this.state = {
            name: '',
            email: '',
            password: '',
            list: []
        }
        this.setName = this.setName.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.sendData = this.sendData.bind(this);
    }

    componentDidMount () {
        PubSub.subscribe('list', (top, data) => {
            this.setState({ list: data})
            console.log(data)
        })
    }

    async sendData (event) {
        event.preventDefault();
        try {
          const response = await axios.post('http://localhost:8000/user', {
            id: this.state.list.length+1,
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
          })
          PubSub.publish('update', true);
        }
        catch(error){
          console.error(error)
        }
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

    render(){
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.sendData} method="post">
                  <CustomInput id="nome" type="text" name="name" value={this.state.name} onChange={this.setName} label="nome"/>
                  <CustomInput id="email" type="email" name="email" value={this.state.email} onChange={this.setEmail} label="email"/>
                  <CustomInput id="password" type="password" name="password" value={this.state.password} onChange={this.setPassword} label="senha"/>
                  <CustomButton label="gravar"/>
                </form>
            </div>
        )
    }
}

class ListAuth extends Component {

    constructor () {
        super();
        this.state = {
            list: [],
            update: true
        }
        this.loadData = this.loadData.bind(this)
    }

    componentDidMount () {
        PubSub.subscribe('update', (top, data) => {
            this.setState({update: data})
            console.log(data)
        })
    }

    async delete (id) {
        try{
          await axios.delete('http://localhost:8000/user/'+id )
          this.loadData();
        }
        catch(error){
          console.log(error)
        }
    }

    async loadData () {
        console.log("chamado")
        try{
          const response = await axios.get('http://localhost:8000/user');
          this.setState({
            list: response.data,
            update: false
          });
          PubSub.publish('list', response.data);
        }
        catch(error){
          console.log(error);
        }
    }

    render(){

        if(this.state.update) this.loadData();
        return(
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
                        <td><button id={item.id} className="pure-button" onClick= { () => this.delete(item.id)} >excluir</button></td>                
                      </tr>
                      )
                    })}
                  </tbody>
                </table> 
            </div>
        )
    }
}

export default class BoxAuth extends Component {
    render(){
        return (
            <div className="content" id="content">
                <FormAuth />
                <ListAuth />
            </div>
        )
    }
}