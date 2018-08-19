import React, {Component} from 'react';
import ReactPlayer from 'react-player'
import TitleName from './title_name'
import MessageAlert from './message_alert'
import '../css/player.css'
import DJName from './dj_name';
export default class Stream extends Component{
constructor(props){
super(props);
this.state = ({url: "", volume: "", duration: "", seek: "", play: "", mute: "",});
this.fetchData = this.fetchData.bind(this);
this.handlepause = this.handlepause.bind(this);
this.handleplay = this.handleplay.bind(this);
this.initialize = this.initialize.bind(this);
this.progress = this.progress.bind(this);
}

fetchData = () => {
	 fetch('http://'+window.location.hostname+':8000/api/song/').then((result) => { 
            return result.json();
        }).then((jsonResult) => {
            var url = "https://www.youtube.com/watch?v=" + jsonResult['url'];
            var volume = (parseFloat(jsonResult['volume'])/100).toString();
            var duration = jsonResult['duration'];
            var seek = jsonResult['seek'];
            var play = (jsonResult['play'] == '0' ? 'false' : 'true');
            var mute = (jsonResult['mute'] == '0' ? 'false' : 'true');
            this.setState(
            {
            	url: url,
            	volume: volume,
            	duration: duration,
            	seek: seek,
            	play: play,
            	mute: mute,
            });
        })
}

handlepause = () => {
        	var data_format =  {
            'url': "",
            'volume': "",
            'duration': "",
            'seek': "",
            'play': "0",
            'mute': "",
            'message': "",
            'dj': "",
            'title': "",
            'token': "stream"       }
            this.connection.send(JSON.stringify(data_format));
}


handleplay = () => {
        	var data_format =  {
            'url': "",
            'volume': "",
            'duration': "",
            'seek': "",
            'play': "1",
            'mute': "",
            'message': "",
            'dj': "",
            'title': "",
            'token': "stream"       }
            this.connection.send(JSON.stringify(data_format));
}

initialize = () => {
	var a = this.player.getDuration();
	this.setState({duration: a});
        	var data_format =  {
            'url': "",
            'volume': "",
            'duration': a,
            'seek': "",
            'play': "",
            'mute': "",
            'message': "",
            'dj': "",
            'title': "",
            'token': "stream"       }
            this.connection.send(JSON.stringify(data_format));
}

progress = () => {
	var a = this.player.getCurrentTime();
	a = parseInt(a);
	        var data_format =  {
            'url': "",
            'volume': "",
            'duration': "",
            'seek': a,
            'play': "",
            'mute': "",
            'message': "",
            'dj': "",
            'title': "",
            'token': "stream"       }
            this.connection.send(JSON.stringify(data_format));
	}
componentDidMount(){
	this.fetchData();
	this.connection = new WebSocket('ws://'+window.location.hostname+':8000/ws/stream/');
    this.connection.onopen = (e) => {console.log('Main PC Socket connected Successfully')}
    this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data);
        var url = data['url']; 
        var volume = data['volume'];
        var duration = data['duration'];
        var seek = data['seek'];
        var play = data['play'];
        var mute = data['mute'];
        if(url !== ""){
        	url = "https://www.youtube.com/watch?v=" + url;
        	this.setState({url: url});
        }
        if(volume !== ""){
        	volume = parseFloat(volume/100).toString();
        	this.setState({volume: volume,});
    }

    	if(duration !== ""){
    		duration = duration;
    		this.setState({duration: duration});
    	}

    	if(seek !== ""){
    		seek = parseInt(seek);
    		var a = parseInt(this.player.getCurrentTime());
    		if( (a<=seek+3 && a>=seek-3) || (seek<=a+3 && seek>=a-3))
    			{void(0);
    			}
    		else
    			this.player.seekTo(seek);
    	}

    	if(play !== ""){
    		 play = (play == '0' ? 'false' : 'true');
    		 this.setState({play: play});
    	}

    	if(mute !== ""){
    		mute = (mute == '0' ? 'false' : 'true');
    		this.setState({mute: mute});
    	}

    };

}
 ref = player => {
    this.player = player
  }
render(){
    return(
        <div className="App playercontainer">
        <div className="main" id="screen">
        <ReactPlayer 
        	className="player"
        	ref={this.ref} 
        	url={this.state.url} 
        	playing={this.state.play === 'true'} 
        	muted={this.state.mute === 'true'} 
        	volume={this.state.volume} 
        	onPause={this.handlepause} 
        	ondPlay={this.handleplay}
        	onDuration={this.initialize}
        	onProgress={this.progress}
        	/>
            <TitleName />
        </div>
        <div className="side-nav" id="feed">
          <div className="djname"><i className="fas fa-headphones icon"></i>Activity Feed
        
          </div>
          <div className="ui divider line"></div>
          <div className="djname grey">Played by: <DJName /></div>
          <div id="activitycardgroup">
          <MessageAlert />
          </div>
        </div>
      </div>
)
}}
