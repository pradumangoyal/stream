import React, {Component} from 'react'
import '../css/SeekControl.css'

export default class SeekControl extends Component {
  constructor(props){
        super(props);
        this.state = ({seek: "", duration: ""});
        this.handleChange = this.handleChange.bind(this);
        this.fetchSeek = this.fetchSeek.bind(this);
        this.HHMMSS = this.HHMMSS.bind(this);
    }
  
  componentDidMount(){
        this.fetchSeek();
        this.connection = new WebSocket('ws://'+window.location.hostname+':8000/ws/stream/');
        this.connection.onopen = (e) => {console.log('Seek Socket connected Successfully')}

        this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data); 
        var seek = data['seek'];
        var duration = data['duration'];
        (seek === "") ? void(0) : this.setState({ seek: seek });
        (duration === "" ) ? void(0) : this.setState({ duration: duration});
    };
}


HHMMSS = (sec) => {
    var sec_num = parseInt(sec, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return hours+':'+minutes+':'+seconds;
}
  handleChange = (event) => {
           var ref = JSON.parse(JSON.parse(window.localStorage.getItem('persist:polls'))['auth'])['access']['token'];
            var data_format =  {
            'url': "",
            'volume': "",
            'duration': "",
            'seek': event.target.value,
            'play': "",
            'mute': "",
            'message': "",
            'dj': "",
            'title': "",
            'token': ref
        }
            this.connection.send(JSON.stringify(data_format));
}
  fetchSeek(){
        fetch('http://'+window.location.hostname+':8000/api/song/').then((result) => { 
            return result.json();
        }).then((jsonResult) => {
            this.setState({ seek: jsonResult['seek'], duration: jsonResult['duration']});
        })
        }


  componentWillUnmount() {
    }

  render() {

    return (
            <input type="range" min="0" max={this.state.duration} value={this.state.seek} onChange={this.handleChange} className="seekbar"/>
    )
  }
}
