import React, {Component} from 'react'
import swal from 'sweetalert';
import disc from './images/disc_change.png'
export default class TitleName extends Component {
  constructor(props){
        super(props);
        this.state = ({title: "", dj: ""});
        this.fetchSongData = this.fetchSongData.bind(this);
    }

  fetchSongData(){
        fetch('http://localhost:8000/api/song/').then((result) => { 
            return result.json();
        }).then((jsonResult) => {
            this.setState({ title: jsonResult['title'], dj: jsonResult['dj']});
        })
        }

  componentDidMount(){
        this.fetchSongData();
        this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
        this.connection.onopen = (e) => {console.log('Title Socket connected Successfully')

        this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data); 
        var title = data['title'];
        var dj = data['dj'];
        if(title === "") 
            void(0)
        else{
            this.setState({ title: title , dj: dj});
            swal({
                title: this.state.title, 
                text:" played by DJ"+this.state.dj,
                icon: disc, 
                button: "Cool",
                timer: 4500,
});
    }};
}}
  
  componentWillUnmount() {
        this.connection.onclose  = function(e){
        console.error('Title Socket Closed!!');
    };
    }

  render() {

    return (
       <span>{this.state.title} <span id="waste"></span></span>
    );
  }
}
