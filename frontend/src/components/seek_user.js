import React, {Component} from 'react'


export default class SeekControl extends Component {
  constructor(props){
        super(props);
        this.state = ({seek: "", duration: ""});
        this.handleChange = this.handleChange.bind(this);
        this.fetchSeek = this.fetchSeek.bind(this);
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
        fetch('http://localhost:8000/api/song/').then((result) => { 
            return result.json();
        }).then((jsonResult) => {
            this.setState({ seek: jsonResult['seek'], duration: jsonResult['duration']});
        })
        }

  componentDidMount(){
        this.fetchSeek();
        this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
        this.connection.onopen = (e) => {console.log('Seek Socket connected Successfully')

        this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data); 
        var seek = data['seek'];
        var duration = data['duration'];
        (seek === "") ? void(0) : this.setState({ seek: seek });
        (duration === "" ) ? void(0) : this.setState({ duration: duration});
    };
}}
  
  componentWillUnmount() {
        this.connection.onclose  = function(e){
        console.error('Seek Socket Closed!!');
    };
    }

  render() {

    return (
       <div>
            <label>Seek: 0 <input type="range" min="0" max={this.state.duration} value={this.state.seek} onChange={this.handleChange} />{this.state.duration}</label>
            <p>{this.state.seek}</p>
       </div> 
    )
  }
}
