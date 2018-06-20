import React, { Component } from 'react'
import VideoItem from './videoitem'
export default class VideoList extends Component {
constructor(props){
super(props)
this.handleClick = this.handleClick.bind(this);
}
handleClick = () => {
    var a = document.getElementById('searchlist');
    a.innerHTML ="";
}
render(){
return (
    <div className="searchlist" onClick={this.handleClick} id="searchlist">
      {this.props.videos.map(video =>( 
        <VideoItem key={video.id.videoId} video={video}/>
     ))}
    </div>
);
}
} 
