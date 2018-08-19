import React, {Component} from 'react'
import swal from 'sweetalert';
import disc from './images/disc_change.png'
export default class Thumbnail extends Component {
  constructor(props){
        super(props);
        this.state = ({url: ""});
        this.fetchSongData = this.fetchSongData.bind(this);
    }

  fetchSongData(){
        fetch('http://'+window.location.hostname+':8000/api/song/').then((result) => { 
            return result.json();
        }).then((jsonResult) => {
            var url = "https://i.ytimg.com/vi/"+jsonResult['url']+"/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAX5camV6b5ih1VzPsJbLMgEa3-lg"
            this.setState({ url: url});
        })
        }

  componentDidMount(){
        this.fetchSongData();
        this.connection = new WebSocket('ws://'+window.location.hostname+':8000/ws/stream/');
        this.connection.onopen = (e) => {console.log('Thumbnail Socket connected Successfully')}
        this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data); 
        url=data['url']
        if(url === "") 
            void(0)
        else{
            var url = "https://i.ytimg.com/vi/"+data['url']+"/hqdefault.jpg?sqp=-oaymwEYCNIBEHZIVfKriqkDCwgBFQAAiEIYAXAB&rs=AOn4CLAX5camV6b5ih1VzPsJbLMgEa3-lg"     
            this.setState({ url: url });
    }};
}
  
  componentWillUnmount() {
        this.connection.onclose  = function(e){
        console.error('Thumbnail0 Socket Closed!!');
    };
    }

  render() {

    return (
       <img src={this.state.url}/>    );
  }
}