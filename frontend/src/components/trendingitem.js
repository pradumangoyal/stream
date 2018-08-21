import React, {Component} from 'react'
import './../css/itemcard.css'
import { Card, Icon, Image } from 'semantic-ui-react'

export default class TrendingItem extends Component {
constructor(props){
    super(props);
    this.handleClick = this.handleClick.bind(this);
}

componentDidMount(){
    this.connection = new WebSocket('ws://'+window.location.hostname+':8000/ws/stream/');
}
handleClick = (event) => {
    var a = document.getElementById(this.props.video.snippet.resourceId.videoId);
    var id = this.props.video.snippet.resourceId.videoId;
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
}}

componentWillUnmount(){
this.connection.onclose = () => { console.error('SEND_URL Socket Closed!!')};
}
render(){return(
<div className="searchItem mcard" id={this.props.video.snippet.resourceId.videoId} label={this.props.video.snippet.title} onClick={this.handleClick}>

        <img src={this.props.video.snippet.thumbnails.high.url}  alt="thumbnail" className="image"/>
        <div className="content">
            <div className="header">{this.props.video.snippet.title}</div> 
            <div className="meta">{this.props.video.snippet.channelTitle}</div>
        </div>
</div>
);}
}
