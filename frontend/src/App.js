import React, { Component } from 'react';
import './css/App.css'
import VolumeControl from './components/VolumeUser';
import SeekControl from './components/SeekUser';
import PlayControl from './components/PlayUser';
import SearchBar from './components/Searchbar';
import DJName from './components/DjName'
import TitleName from './components/TitleName'
import Message from './components/Message'
import MessageAlert from './components/MessageAlert'
import Thumbnail from './components/Thumbnail'
import DurationControl from './components/Duration'
import Trending from './components/Trending'
class App extends Component {
  constructor(props){
     super(props) ;
     this.logout = this.logout.bind(this);
   }
  componentDidMount(){
    this.connection = new WebSocket('ws://'+window.location.hostname+':8000/ws/stream/');   
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
