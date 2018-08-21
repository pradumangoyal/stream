import React, {Component} from 'react';
export default class OptionImage extends Component{
    
    render(){
        return(
            <span> 
            <i className={this.props.type === 'sound' ? ( this.props.source === 'mute' ? "fas fa-volume-off" : "fas fa-volume-up") : (this.props.source === 'play' ? "fas fa-play" : " fas fa-pause" )} alt={this.props.source} id="controlicons"></i>
            </span>
    )
    }
    

}
