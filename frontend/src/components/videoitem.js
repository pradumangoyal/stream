import React, {Component} from 'react'
import './../css/searchcard.css'

export default class VideoItem extends Component {
constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
}

componentDidMount(){
    this.connection = new WebSocket('ws://'+window.location.hostname+':8000/ws/stream/');
}
handleClick = (event) => {
    var a = document.getElementById(this.props.video.id.videoId);
    var id = this.props.video.id.videoId;
    var title = a.getAttribute('label');
    var ref = JSON.parse(JSON.parse(window.localStorage.getItem('persist:polls'))['auth'])['access']['token'];
    if(this.connection.OPEN){
            var data_format =  {
            'url': id,
            'volume': "",
            'duration': "",
            'seek': "0",
            'play': "1",
            'mute': "",
            'message': "",
            'dj': "",
            'title': title,
            'token': ref
        }
            this.connection.send(JSON.stringify(data_format));
    }
}

componentWillUnmount(){
this.connection.onclose = () => { console.error('SEND_URL Socket Closed!!')};
}
render(){return( 
<div className="searchItem mcard" id={this.props.video.id.videoId} label={this.props.video.snippet.title} onClick={this.handleClick}>
        <img src={this.props.video.snippet.thumbnails.high.url}  alt="thumbnail" className="image"/>
        <div className="content">
            <div className="header">{this.props.video.snippet.title}</div> 
            <div className="meta">{this.props.video.snippet.channelTitle}</div>
        </div>
</div>
);
}
}
