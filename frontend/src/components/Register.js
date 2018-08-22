import React, {Component} from 'react'
import { Button, Form, Message} from 'semantic-ui-react'

export default class Register extends Component {
    constructor(props){
        super(props);
        this.state = { username: "", password1: "", password2: "", error: "", success: ""};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }
    handleSubmit = (event) => {

        if(this.state.password1 == this.state.password2){
            fetch('http://'+window.location.hostname+':8000/api/register/', {
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
                this.setState({success: "The account ("+this.state.username+") created successfully. Wait for admin to approve your account", error:""});
                this.setState({password1: '', password2: '', });
        }
            else{
                    this.setState({error: "", success: ""});
                    if(this.state.password1.length<8)
                    {this.state.error='Password should be of minimum 8 charachters'}     
                    else
                    {this.state.error='User with this username ('+this.state.username+') already exists.'
                    this.setState({username: ""})
                    }   
                    this.setState({success: ""});
                    this.setState({password1: '', password2: '', });
                }
            }
        )}
        else{
            this.setState({success:"", error: 'User was not created, Password does not match.'});
            this.setState({password1: '', password2: '', });
        }
        event.preventDefault();
    }
    render(){
    return (
        <div className='body'>
        <div className='form-container'>
        <Form onSubmit={this.handleSubmit} error className='form-div' success error>
        <h1>Register</h1>
            {this.state.success ? 
                <Message success content={this.state.success}/>
            : void(0)
            }
            {this.state.error ? <Message error content={this.state.error} />
            : void(0)
            }
            <Form.Field>
                <label>Username</label>
                <input type="text" name="username" value={this.state.username} placeholder="Username" onChange={this.handleChange} required/>
                </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input type="password" name="password1" value={this.state.password1} placeholder="Password" onChange={this.handleChange} required />
                </Form.Field>
            <Form.Field>            
                <label>Confirm password</label>
                <input type="password" name="password2" value={this.state.password2} placeholder="Re-enter your password" onChange={this.handleChange} required />
            </Form.Field>
            <Button type="submit">Submit</Button>
            <div>Have an account? <a href="./login">Login</a></div>
          </Form>
          </div>
        </div>
    )
  }
}
