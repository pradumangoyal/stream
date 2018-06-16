import React, {Component} from 'react'


export default class VolumeControl extends Component {
  constructor(props){
        super(props);
    //    const results = fetch('http://127.0.0.1:8000/api/song/');
      //  const in_data = results.json();
        this.state = { volume: ""};
        this.handleChange = this.handleChange.bind(this);
    }
  handleChange(event){
           var data_format =  {
            'url': "",
            'volume': event.target.value,
            'duration': "",
            'seek': "",
            'play': "",
            'mute': "",
            'message': ""
        }
            this.connection.send(JSON.stringify(data_format));
  }
  componentDidMount(){
        this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
        this.connection.onopen = function(e){console.log('Volume Socket connected Successfully')};
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
