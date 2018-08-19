import React, {Component} from 'react'
export default class MessageAlert extends Component {
  constructor(props){
        super(props);
        this.state = ({reaction: "", name: "", path: ""});
    }


  componentDidMount(){
        this.connection = new WebSocket('ws://'+window.location.hostname+':8000/ws/stream/');
        this.connection.onopen = (e) => {console.log('Message Reciever Socket connected Successfully')}

        this.connection.onmessage = (e) => {
        var data = JSON.parse(e.data); 
        var reaction = data['message'];
        var name = data['dj'];
        if(reaction === "") 
            void(0)
        else {
            var a = './images/reactions/' + reaction + '.png';
            this.setState({ reaction: reaction , name: name, path: a});
            let div = document.createElement('div');
            div.className = 'activitycard';
            let imagecard = document.createElement('span');
            imagecard.className = 'imagecard';
            let icon = document.createElement('img');
            icon.className = 'icon reacticon';
            icon.src = a;
            imagecard.appendChild(icon);
            div.appendChild(imagecard);
            let spanusername = document.createElement('span');
            spanusername.className = 'username';
            spanusername.innerHTML = this.state.name;
            div.appendChild(spanusername);
            let span=document.createElement('span');
            span.innerHTML=' reacted ';
            div.appendChild(span);
            let detailspan = document.createElement('span');
            detailspan.className = 'detail';
            detailspan.innerHTML=this.state.reaction;
            div.appendChild(detailspan);document.getElementById('activitycardgroup').appendChild(div);
 
 
}};
}
  
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
