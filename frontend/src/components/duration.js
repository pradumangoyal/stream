import React, {Component} from 'react'


export default class DurationControl extends Component {
    constructor(props){
        super(props);
        this.state = ({seek: "", duration: ""});
        this.fetchSeek = this.fetchSeek.bind(this);
        this.HHMMSS = this.HHMMSS.bind(this);
    }
    
    componentDidMount(){
        this.fetchSeek();
        this.connection = new WebSocket('ws://'+window.location.hostname+':8000/ws/stream/');
        this.connection.onopen = (e) => {console.log('Seek Socket connected Successfully')}
        
        this.connection.onmessage = (e) => {
            var data = JSON.parse(e.data);
            var duration = data['duration'];
            let seek = data['seek'];
            (seek === "") ? void(0) : this.setState({seek: seek});
            (duration === "" ) ? void(0) : this.setState({ duration: duration});
            console.log('hi');
        };
    }
    
    
    HHMMSS = (sec) => {
        var sec_num = parseInt(sec, 10); // don't forget the second param
        var hours   = Math.floor(sec_num / 3600);
        var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
        var seconds = sec_num - (hours * 3600) - (minutes * 60);
        
        if (hours   < 10) {hours   = "0"+hours;}
        if (minutes < 10) {minutes = "0"+minutes;}
        if (seconds < 10) {seconds = "0"+seconds;}
        return hours+':'+minutes+':'+seconds;
    }
    fetchSeek(){
        fetch('http://localhost:8000/api/song/')
        .then((result) => { 
            return result.json();
        })
        .then((jsonResult) => {
            this.setState({seek: jsonResult['seek'], duration: jsonResult['duration']});
        })
    }
    
    
    componentWillUnmount() {
        this.connection.onclose  = function(e){
            console.error('Seek Socket Closed!!');
        };
    }
    
    render() {
        
        return (
            <span>{this.HHMMSS(this.state.seek)}/{this.HHMMSS(this.state.duration)}</span> 
        )
    }
}
