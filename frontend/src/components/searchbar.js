import React, {Component} from 'react'
import YTSearch from 'youtube-api-search'
import VideoList from "./videolist"
import 'semantic-ui-css/semantic.min.css';
import { Input } from 'semantic-ui-react'
import './../css/search.css'
const API_KEY = "AIzaSyBWrbInxNOvSTDxxM95HEVF6ApT1VCTIOA"


let pStyle = {
    fontSize: '1rem',
}
export default class SearchBar extends Component {
  constructor(props){
        super(props);
        this.state = ({url: "", dj: "", videos: []});
    this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

  handleChange = (event) => {
    if(event.target.value === "")
        this.setState({videos: []});
    else{
        YTSearch({key: API_KEY, term: event.target.value}, (videos) => {
            console.log(videos);
            this.setState({
            videos: videos,
        });
    });
}}
  
  handleClick = () => {
    this.setState({ videos: []});
    var a = document.getElementById('searchBar')
    a.value = "";
    }
  

  render() {

    return (
        <div className="search">
            <label><Input icon="fas fa-search" placeholder="Search..." onChange={this.handleChange} className="searchBar" id="searchBar" />
             </label>
             <div className="heading">Search Results</div>
            <div className="ui divider line"></div>
            {this.state.videos.length > 0 ?
             <div  className="searchlistbox" id="searchlistbox">
                <VideoList videos={this.state.videos}/>
        </div>: <p style={pStyle}>Search for Songs, Artists or even <i>Cat Videos</i></p>}
           
           </div>
    );
  }
}
