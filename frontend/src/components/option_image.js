import React, {Component} from 'react';
import unmute from './images/unmute.png';
import mute from './images/mute.png';
import play from './images/play.png';
import pause from './images/pause.png';
export default class OptionImage extends Component{
    
    render(){
        return(
            <div> 
            <img src={this.props.type === 'sound' ? ( this.props.source === 'mute' ? mute : unmute) : (this.props.source === 'play' ? play : pause )}  width="50" height="50" alt={this.props.source}/>
            </div>
    )
    }
    

}
