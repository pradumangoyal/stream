import React, { Component } from 'react'
import TrendingItem from './trendingitem'
export default class TrendingList extends Component{
constructor(props){
    super(props);
}
componentDidMount(){
    this.connection = new WebSocket('ws://'+window.location.hostname+':8000/ws/stream/');
}
render(){
return (
    <div className="searchlist trendinglist" id="searchlist">
      {this.props.videos.map(video =>( 
        <TrendingItem key={video.snippet.resourceId.videoId} video={video} conn={this.connection}/>
     ))}
    </div>
);
}
} 
