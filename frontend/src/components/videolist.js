import React, { Component } from 'react'
import VideoItem from './videoitem'
export default class VideoList extends Component {
constructor(props){
super(props)
}
render(){
return (
    <div className="searchlist">
      {this.props.videos.map(video =>( 
        <VideoItem key={video.id.videoId} video={video}/>
     ))}
    </div>
);
}
} 
