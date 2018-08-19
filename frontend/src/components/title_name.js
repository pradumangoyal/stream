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
        this.connection.onopen = (e) => {console.log('Title Socket connected Successfully')}

        this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data); 
        var title = data['title'];
        var dj = data['dj'];
        if(title === "") 
            void(0)
        else{
            this.setState({ title: title , dj: dj});
            let div = document.createElement('div');
            div.className = 'activitycard';
            let imagecard = document.createElement('span');
            imagecard.className = 'imagecard';
            let icon = document.createElement('i');
            icon.className = 'music icon';
            imagecard.appendChild(icon)
            div.appendChild(imagecard);
            let spanusername = document.createElement('span');
            spanusername.className = 'username';
            spanusername.innerHTML = this.state.dj;
            div.appendChild(spanusername);
            let span=document.createElement('span');
            span.innerHTML=' played<br>';
            div.appendChild(span);
            let detailspan = document.createElement('span');
            detailspan.className = 'detail';
            detailspan.innerHTML=this.state.title;
            div.appendChild(detailspan);document.getElementById('activitycardgroup').appendChild(div);
        }
    }};
  
  componentWillUnmount() {
        this.connection.onclose  = function(e){
        console.error('Title Socket Closed!!');
    };
    }

  render() {

    return (
       <span className="djalert">{this.state.title} <span id="waste"></span></span>
    );
  }
}
