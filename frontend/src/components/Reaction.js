import React, {Component} from 'react';
import streamSocket from './Socket';

export default class Reaction extends Component{
constructor(props){
super(props);
this.handleClick = this.handleClick.bind(this);
this.state = ({path: ""});
}

componentDidMount(){
this.connection = streamSocket
this.connection.onopen = () => {console.log(this.props.reaction)};
var a = "./images/reactions/"+this.props.reaction+".png";
this.setState({path: a});
}
handleClick = () => {
 var ref = JSON.parse(JSON.parse(window.localStorage.getItem('persist:polls'))['auth'])['access']['token'];
 if(this.connection.OPEN){
            var data_format =  {
            'url': "",
            'volume': "",
            'duration': "",
            'seek': "",
            'play': "",
            'mute': "",
            'message': this.props.reaction,
            'dj': "",
            'title': "",
            'token': ref
        }
            this.connection.send(JSON.stringify(data_format));
        }}

render(){
    return(
        <span onClick={this.handleClick} className="emoji_container"><img src={this.state.path} width="50px" height="50" alt={this.props.reaction} className="emojis"/></span>
);
}
}
