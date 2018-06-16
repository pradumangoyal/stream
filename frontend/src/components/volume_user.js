import React, {Component} from 'react'


export default class VolumeControl extends Component {
  constructor(props){
        super(props);
        this.state = ({volume: ""});
        this.handleChange = this.handleChange.bind(this);
        this.initial = this.initial.bind(this);

    }

  handleChange(event){
           var data_format =  {
            'url': "",
            'volume': event.target.value,
            'duration': "",
            'seek': "",
            'play': "",
            'mute': "",
            'message': "",
            'dj': "",
            'token': JSON.parse(JSON.parse(window.localStorage.getItem('persist:polls'))['auth'])['access']['token']
        }
            this.connection.send(JSON.stringify(data_format));
  }

  initial(b = ""){
    this.setState({volume: b});
    }
  componentDidMount(){
        this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
        this.connection.onopen = function(e){console.log('Volume Socket connected Successfully')

    //    fetch('http://localhost:8000/api/song/').then((result) => {
      //  return result.json();
       // }).then((jsonResult) => {
       //     this.initial(jsonResult['volume']);
   // })
        };
        this.connection.onmessage = function(e){
        var data = JSON.parse(e.data); 
        var volume = data['volume'];
        (volume === "") ? void(0) : this.setState({ volume: volume })
    }.bind(this);
}
  
  componentWillUnmount() {
        this.connection.onclose  = function(e){
        console.error('Volume Socket Closed!!');
    };
    }

  render() {

    return (
       <div>
            <input type="range" min="0" max="100" value={this.state.volume} onChange={this.handleChange} />
       </div> 
    )
  }
}
