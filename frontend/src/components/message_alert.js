import React, {Component} from 'react'
import swal from 'sweetalert';
import '../css/reaction.css';
export default class MessageAlert extends Component {
  constructor(props){
        super(props);
        this.state = ({reaction: "", name: "", path: ""});
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
            var a = './images/reactions/' + reaction + '.gif';
            this.setState({ reaction: reaction , name: name, path: a});
            swal({
                title: this.state.name, 
                text:" reacted "+ this.state.reaction,
                icon: this.state.path, 
                button: "OK!",
                timer: 3000,
                className: "messagealert",
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
