import React, {Component} from 'react'
import Error from './error'
import logo from '../logo.png';

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = { username: "", password1: "", password2: "", error: [], success: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit = (event) => {
        document.getElementById('error').style.visibility = 'hidden';
        document.getElementById('success').style.visibility = 'hidden';
        if(this.state.password1 == this.state.password2){
            fetch('http://localhost:8000/api/register/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            username: this.state.username,
            password: this.state.password1,
            })
        }).then((response) => {
            if(response['status']<300 && response['status']>=200 ){
                document.getElementById('error').style.visibility = 'hidden';
                document.getElementById('success').style.visibility = 'visible';
                this.setState({success: "The Account("+this.state.username+") Created Successfully. Wait For Admin to Approve Your Account", error:[]});
                this.setState({password1: '', password2: '', });
        }
            else{
                    document.getElementById('success').style.visibility = 'hidden';
                    document.getElementById('error').style.visibility = 'visible';
                    this.setState({error: [], success: ""});
                    this.state.error.push('User was not created.');
                    if(this.state.password1.length<8)
                    {this.state.error.push('Password should be of minimum 8 charachters')}        
                    this.setState({success: ""});
                    this.setState({password1: '', password2: '', });
                }
            }
        )}
        else{
           document.getElementById('success').style.visibility = 'hidden';
           document.getElementById('error').style.visibility = 'visible';
            this.setState({success:"", error: ['User was not created' ,'Password Does not Match.']});
            this.setState({password1: '', password2: '', });
        }
        event.preventDefault();
    }
    render(){
    return (
        <div className='body'>
        <header className="App-header-login">
          <div className="logo_container"><img src={logo} className="App-logo" alt="logo" /></div>
          <h1 className="App-title">Stream</h1>
        </header>
        <div className='regform-container'>
          <h1>Register</h1>
          <div className="success" id="success">{this.state.success}</div>
          <form onSubmit={this.handleSubmit}>
            <label>
                Username: <br /><input type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} required/>
            </label>
            <label>
                Password: <br /><input type="password" name="password1" value={this.state.password1} placeholder="Password" onChange={this.handleChange} required />
            </label>
            <label>
                Confirm_Password: <br /><input type="password" name="password2" value={this.state.password2} placeholder="Re-enter Your Password" onChange={this.handleChange} required />
            </label>
            <div className="error" id='error' ><Error errors={this.state.error} /></div>
            <button type="submit">Submit</button>
          </form>
          <div>Have an Account?<a href="./login">Login</a></div>
          </div>
        </div>
    )
  }
}
