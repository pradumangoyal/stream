import React, {Component} from 'react'


export default class DJName extends Component {
  constructor(props){
        super(props);
        this.state = ({dj: ""});
        this.fetchDJData = this.fetchDJData.bind(this);
    }

  fetchDJData(){
        fetch('http://localhost:8000/api/song/').then((result) => { 
            return result.json();
        }).then((jsonResult) => {
            this.setState({ dj: jsonResult['dj']});
        })
        }

  componentDidMount(){
        this.fetchDJData();
        this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
        this.connection.onopen = (e) => {console.log('DJ Socket connected Successfully')}

        this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data); 
        var dj = data['dj'];
        var url = data['url'];
        (url === "") ? void(0) : this.setState({ dj: dj })
    };
}
  
  componentWillUnmount() {
        this.connection.onclose  = function(e){
        console.error('DJ Socket Closed!!');
    };
    }
  render() {
    let spanStyle = {
        marginLeft: '5px',
    }
    return (
       <span style={spanStyle}>DJ<span style={spanStyle}>{this.state.dj}</span></span>
    );
  }
}
