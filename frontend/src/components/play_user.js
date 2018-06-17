import React, {Component} from 'react'
import OptionImage from './option_image';

export default class VolumeControl extends Component {
  constructor(props){
        super(props);
        this.state = ({play: ""});
        this.handleClick = this.handleClick.bind(this);
        this.fetchPlayData = this.fetchPlayData.bind(this);
    }

  handleClick = (event) => {
            var a = document.getElementById('play-control').getAttribute('label');
            var b = (a === "0" ? "1" : "0");
           var ref = JSON.parse(JSON.parse(window.localStorage.getItem('persist:polls'))['auth'])['access']['token'];
            var data_format =  {
            'url': "",
            'volume': "",
            'duration': "",
            'seek': "",
            'play': b,
            'mute': "",
            'message': "",
            'dj': "",
            'token': ref
        }
            this.connection.send(JSON.stringify(data_format));

}
  fetchPlayData(){
        fetch('http://localhost:8000/api/song/').then((result) => { 
            return result.json();
        }).then((jsonResult) => {
            this.setState({ play: jsonResult['play']});
        })
        }

  componentDidMount(){
        this.fetchPlayData();
        this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
        this.connection.onopen = (e) => {console.log('Play/Pause Socket connected Successfully')

        this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data); 
        var play = data['play'];
        (play === "") ? void(0) : this.setState({ play: play })
    };
}}
  
  componentWillUnmount() {
        this.connection.onclose  = function(e){
        console.error('Play/Pause Socket Closed!!');
    };
    }

  render() {

    return (
       <div onClick={this.handleClick} label={this.state.play} id="play-control">
            <OptionImage type="control" source={this.state.play === "1" ? "pause" : "play" } />
       </div> 
    )
  }
}
