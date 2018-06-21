import React, {Component} from 'react'
import YTSearch from 'youtube-api-search'
import VideoList from "./videolist"
import '../css/search.css'
const API_KEY = "AIzaSyBWrbInxNOvSTDxxM95HEVF6ApT1VCTIOA"

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
        this.setState({
            videos: videos,
        });

    });
}}
  
  handleClick = () => {
    this.setState({ videos: []});
    var a = document.getElementById('searchBar');
    a.value="";
    }
  

  render() {

    return (
        <div className="container">
            <label><input type="search" onChange={this.handleChange} placeholder="Search" className="searchBar" id="searchBar"/></label>
            <div  className="searchlistbox" onClick={this.handleClick}>
            <VideoList videos={this.state.videos} />
        </div></div>
    );
  }
}
