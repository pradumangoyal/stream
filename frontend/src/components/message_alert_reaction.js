import React, {Component} from 'react'
import '../css/reaction.css';
export default class MessageAlertImage extends Component {
  constructor(props){
        super(props);
        this.state = ({reaction: "", path: ""});
    }

    hide = () => {
        document.getElementById("reply_emoji").style.display = "none";
    }
   show = () => {
        document.getElementById("reply_emoji").style.display = "block";
    }
  componentDidMount(){
        this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
        this.connection.onopen = (e) => {console.log('Message Reciever Socket connected Successfully')

        this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data); 
        var reaction = data['message'];
        if(reaction === "") 
            void(0)
        else{
            var a = './images/reaction_reply/' + reaction + '.gif';
            this.setState({ reaction: reaction , path: a});
            this.show();
            setTimeout(this.hide, 15000);
}};
}}
  
  componentWillUnmount() {
        this.connection.onclose  = function(e){
        console.error('Title Socket Closed!!');
    };
    }

  render() {

    return (
       <div><img src={this.state.path} alt="Reaction" className="reply_emoji" id="reply_emoji"/></div>
    );
  }
}
