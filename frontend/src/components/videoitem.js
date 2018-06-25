import React, {Component} from 'react'

export default class VideoItem extends Component {
constructor(props){
    super(props);
}

componentDidMount(){
    this.connection = this.props.conn;
    this.connection.onopen = () => { console.log('SEND_URL Socket Connected Succesfully') };
}
handleClick = (event) => {
    var a = document.getElementById(this.props.video.id.videoId);
    var id = this.props.video.id.videoId;
    var title = a.getAttribute('label');
    var ref = JSON.parse(JSON.parse(window.localStorage.getItem('persist:polls'))['auth'])['access']['token'];
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

componentWillUnmount(){
this.connection.onclose = () => { console.error('SEND_URL Socket Closed!!')};
}
render(){return(
<div className="searchItem" id={this.props.video.id.videoId} label={this.props.video.snippet.title} onClick={this.handleClick}>
    <img className="searchItemThumbnail" src={this.props.video.snippet.thumbnails.default.url}  alt="thumbnail" />
    <span className="searchItemTitle">{this.props.video.snippet.title}</span> 
    <span className="searchItemChannel">{this.props.video.snippet.channelTitle}</span>  
</div>
);}
}
