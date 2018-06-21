import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
//import autorefresh from 'jwt-autorefresh'
import VolumeControl from './components/volume_user';
import SeekControl from './components/seek_user';
import PlayControl from './components/play_user';
import MuteControl from './components/mute_user';
import SearchBar from './components/searchbar';
import DJName from './components/dj_name'
import TitleName from './components/title_name'
import Message from './components/message'
import MessageAlert from './components/message_alert'
import DJImage from './components/dj'
//import OptionImage from './components/option_image';
//const refresh = () => {
 // const init =  { method: 'POST'
  //              , headers: { 'Content-Type': `application/x-www-form-urlencoded` }
//                , body: `refresh_token=${localStorage.refresh_token}&grant_type=refresh_token`
  //              }
//  return fetch('http://localhost:8000/api/auh/token/obtain/', init)
  //  .then(res => res.json())
//    .then(({ token_type, access_token, expires_in, refresh_token }) => {
     // localStorage.access_token = access_token
      //localStorage.refresh_token = refresh_token
    //  return access_token
  //  })
//}

//const leadSeconds = () => {
  /** Generate random additional seconds (up to 30 in this case) to append to the lead time to ensure multiple clients dont schedule simultaneous refresh */
  //const jitter = Math.floor(Math.random() * 30)
 
  /** Schedule autorefresh to occur 60 to 90 seconds prior to token expiration */
 // return 60 + jitter
//}

//let start = autorefresh({ refresh, leadSeconds })
//let cancel = () => {}
//access_token => {
//  console.log('refreshed');
//  cancel()
//  cancel = start(access_token)
//};

class App extends Component {
  constructor(props){
     super(props) ;
    this.handleClick = this.handleClick.bind(this);
     this.logout = this.logout.bind(this);  
   }
  componentDidMount(){
    this.connection = new WebSocket('ws://localhost:8000/ws/stream/');   
    this.connection.onopen = () => {console.log('WebSocket Connected')};
    }
  componentWillUnmount(){
    this.connection.onclose = () => {console.error('WebSocket Closed!')};
    }
  logout(e){
    e.preventDefault();
    localStorage.removeItem("persist:polls");
    window.location.reload();
    }

    handleClick(e){
        var a = document.getElementById('cont')
        console.log('hey!' + a.getAttribute('label'));
    }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="logo_container"><img src={logo} className="App-logo" alt="logo" /></div>
          <h1 className="App-title">Stream</h1>
          <button onClick={this.logout} className="logout">LOGOUT</button>
        </header>
 <div className="song_playing"><TitleName />
</div>

        <div className="searchbox"><SearchBar conn={this.connection}/></div>

        <div className="djc"><DJImage /></div>
        <MessageAlert />
        <Message />
        <footer className="App-footer">
        <div className="seek"><SeekControl conn={this.connection}/></div>
        <div className="volume"><VolumeControl conn={this.connection}/></div>
        <div className="play"><PlayControl conn={this.connection}/></div>
        <div className="mute"><MuteControl conn={this.connection}/></div>
        <div onClick={this.handleClick} label="hi" id="cont">Hi</div>
        </footer>
      </div>
    );
  }
}

export default App;
