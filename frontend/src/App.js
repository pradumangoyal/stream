import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
     super(props) ;

     this.logout = this.logout.bind(this);  
   }
  logout(e){
    e.preventDefault();
    localStorage.removeItem("persist:polls");
    window.location.reload();
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.logout}>LOGOUT</button>
      </div>
    );
  }
}

export default App;
