import React, { Component } from 'react'
import TrendingList from './TrendingList'
import 'semantic-ui-css/semantic.min.css';
const API_KEY = "AIzaSyBwsgFW-K4DvwOKdC_12ftDPQhfyv26bkg"

let pStyle = {
    fontSize: '1rem',
}
export default class Trending extends Component {
    constructor(props) {
        super(props);
        this.fetchVideos = this.fetchVideos.bind(this);
        this.state = ({ videos: [] });
    }
    componentDidMount() {
        this.fetchVideos();
    }

    fetchVideos() {
        fetch('https://www.googleapis.com/youtube/v3/playlistItems?part=snippet,contentDetails&maxResults=20&playlistId=PLFgquLnL59alW3xmYiWRaoz0oM3H17Lth&order=rating&key=AIzaSyBwsgFW-K4DvwOKdC_12ftDPQhfyv26bkg&relevanceLanguage=hin')
            .then((result) => {
                return result.json();
            })
            .then((jsonResult) => {
                this.setState({ videos: jsonResult['items'] });
            })
    }

    render() {

        return (
            <div className="trending">
                <div className="heading">Videos You Might Like</div>
                <div className="ui divider line"></div>
                {this.state.videos.length > 0 ?                 
                    <div className="trendinglistbox">
                    <TrendingList videos={this.state.videos} />
                    </div> : <p style={pStyle}>Search for Songs, Artists or even <i>Cat Videos</i></p>
                }

            </div>
        );
    }
}
