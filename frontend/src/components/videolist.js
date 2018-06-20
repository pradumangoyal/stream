import React, { Component } from 'react'
import VideoItem from './videoitem'
export default class VideoList extends Component{
componentDidMount(){
    this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
}
render(){
return (
    <div className="searchlist">
      {this.props.videos.map(video =>( 
        <VideoItem key={video.id.videoId} video={video} conn={this.connection}/>
     ))}
    </div>
);
}
} 
