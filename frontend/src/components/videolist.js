import React, { Component } from 'react'
import VideoItem from './videoitem'
import { Card } from 'semantic-ui-react'
export default class VideoList extends Component{
constructor(props){
    super(props);
}
componentDidMount(){
    this.connection = new WebSocket('ws://localhost:8000/ws/stream/');
}
render(){
return (
    <div className="searchlist" id="searchlist">
      {this.props.videos.map(video =>( 
        <VideoItem key={video.id.videoId} video={video} conn={this.connection}/>
     ))}
    </div>
);
}
} 
