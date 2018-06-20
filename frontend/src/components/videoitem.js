import React, {Component} from 'react'

export default class VideoItem extends Component {
constructor(props){
    super(props);
}
render(){
return(
<div className="searchItem" id={this.props.id} >{console.log(this.props.video)}<img className="searchItemThumbnail" src={this.props.video.snippet.thumbnails.default.url}  alt="thumbnail" /> <span className="searchItemTitle">{this.props.video.snippet.title}</span> <span className="searchItemChannel">{this.props.video.snippet.channelTitle}</span></div>
);

}}
