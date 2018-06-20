import React, {Component} from 'react'

export default class VideoItem extends Component {
constructor(props){
    super(props);
this.handleClick = this.handleClick.bind(this);
}

handleClick = (event) => {
    var a = document.getElementById(this.props.video.id.videoId);
    var id = this.props.video.id.videoId;
    var title = a.getAttribute('label');
    console.log(id+title);
}
render(){
return(
<div className="searchItem" id={this.props.video.id.videoId} label={this.props.video.snippet.title} onClick={this.handleClick}>
    <img className="searchItemThumbnail" src={this.props.video.snippet.thumbnails.default.url}  alt="thumbnail" />
    <span className="searchItemTitle">{this.props.video.snippet.title}</span> 
    <span className="searchItemChannel">{this.props.video.snippet.channelTitle}</span>  
</div>
);

}}
