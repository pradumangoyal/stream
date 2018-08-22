import React, { Component } from 'react';
import Reaction from './Reaction'
export default class Message extends Component{

componentDidMount(){
 this.connection = new WebSocket('ws://'+window.location.hostname+':8000/ws/stream/');
 this.connection.onopen = (e) => {console.log('Message Socket connected Successfully')
}}
componentWillUnmount(){
    this.connection.onclose = function(e){
    console.error('Message Socket Closed!!');
};
}

render(){
    return(
        <div className="reaction_container">
            <Reaction reaction="cheer" conn={this.connection} />
            <Reaction reaction="wow" conn={this.connection} />
            <Reaction reaction="love" conn={this.connection} />
            <Reaction reaction="disappointed" conn={this.connection} />
            <Reaction reaction="anger" conn={this.connection} />
        </div>
);
}
}
