import React, {Component} from 'react'
import swal from 'sweetalert';
import cheer from './images/reactions/cheer.gif';
import wow from './images/reactions/wow.gif';
import love from './images/reactions/love.gif';
import disappointed from './images/reactions/disappointed.gif';
import anger from './images/reactions/anger.gif';


export default class TitleName extends Component {
  constructor(props){
        super(props);
        this.state = ({reaction: "", name: ""});
    }


  componentDidMount(){
        this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
        this.connection.onopen = (e) => {console.log('Message Reciever Socket connected Successfully')

        this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data); 
        var reaction = data['message'];
        var name = data['dj'];
        if(reaction === "") 
            void(0)
        else{
            this.setState({ reaction: reaction , name: name});
            swal({
                title: this.state.name, 
                text:" reacted "+ this.state.reaction,
                icon: this.state.reaction, 
                button: "OK!",
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
       <span></span>
    );
  }
}
