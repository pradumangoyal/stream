import React, {Component} from 'react'
import OptionImage from './OptionImage';

export default class VolumeControl extends Component {
  constructor(props){
        super(props);
        this.state = ({mute: ""});
        this.handleClick = this.handleClick.bind(this);
        this.fetchMuteData = this.fetchMuteData.bind(this);
    }

  handleClick = (event) => {
            var a = document.getElementById('mute-controlid').getAttribute('label');
            var b = (a === "0" ? "1" : "0");
           var ref = JSON.parse(JSON.parse(window.localStorage.getItem('persist:polls'))['auth'])['access']['token'];
           if(this.connection.OPEN){
            var data_format =  {
            'url': "",
            'volume': "",
            'duration': "",
            'seek': "",
            'play': "",
            'mute': b,
            'message': "",
            'dj': "",
            'title': "",
            'token': ref
        }
            this.connection.send(JSON.stringify(data_format));
    }
}
  fetchMuteData(){
        fetch('http://'+window.location.hostname+':8000/api/song/').then((result) => { 
            return result.json();
        }).then((jsonResult) => {
            this.setState({ mute: jsonResult['mute']});
        })
        }

  componentDidMount(){
        this.fetchMuteData();
        this.connection = new WebSocket('ws://'+window.location.hostname+':8000/ws/stream/');
        this.connection.onopen = (e) => {console.log('Mute Socket connected Successfully')}

        this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data); 
        var mute = data['mute'];
        (mute === "") ? void(0) : this.setState({ mute: mute })
    };
}
  
  componentWillUnmount() {
        this.connection.onclose  = function(e){
        console.error('Mute Socket Closed!!');
    };
    }

  render() {

    return (
       <span onClick={this.handleClick} label={this.state.mute} id="mute-controlid">
            <OptionImage type="sound" source={this.state.mute === "1" ? "mute" : "unmute" } />
       </span> 
    )
  }
}
