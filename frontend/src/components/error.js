import React, { Component } from 'react';

export default class Error extends Component{
    render(){
        return(
            <ul>{this.props.errors.map(error => (
                <li key={error} >{error}</li>
            ))}</ul>
    );
    }
}
