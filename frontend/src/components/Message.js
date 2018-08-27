import React, { Component } from 'react';
import Reaction from './Reaction'
export default class Message extends Component{

componentDidMount(){
}
componentWillUnmount(){
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
