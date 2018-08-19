import React, { Component } from 'react';
import './css/App.css'
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
import Thumbnail from './components/thumbnail'
import DurationControl from './components/duration'
import Trending from './components/trending'
class App extends Component {
  constructor(props){
     super(props) ;
     this.logout = this.logout.bind(this);  
   }
  componentDidMount(){
    this.connection = new WebSocket('ws://localhost:8000/ws/stream/');   
    this.connection.onopen = () => {console.log('WebSocket Connected')};
    }
  componentWillUnmount(){
    this.connection.onclose = () => {console.error('WebSocket Closed!')};
    }
    handleClick = () => {
    this.setState({ videos: []});
    }
  logout(e){
    e.preventDefault();
    localStorage.removeItem("persist:polls");
    window.location.reload();
    }


  render() {
    return (
    <div className="App">
    <div className="left-side-nav" id="reactions">
      <Message /><MessageAlert />
      <i  onClick={this.logout} className="logout fas fa-sign-out-alt" id="logout"></i>
    </div>
    <div className="main" id="screen">
      <SearchBar /><Trending />
    </div>
    <div className="side-nav" id="feed">
      <div className="djname"><i className="fas fa-headphones icon"></i>Activity Feed
     
      </div>
      <div className="ui divider line"></div>
      <div className="djname grey">Played by: <DJName /></div>
      <div id="activitycardgroup">
     
      </div>
    </div>
    <div className="controls" id="footer">
      <div className="currentsong"><Thumbnail /><TitleName /></div>
      <div className="playcontrols"><div><SeekControl /></div><div><PlayControl /><DurationControl /></div></div>
      <div className="volumecontrols"><VolumeControl /></div>
    </div>
      </div>
    );
  }
}

export default App;
