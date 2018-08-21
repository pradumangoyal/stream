import React, {Component} from 'react'
import { Button, Form, Message} from 'semantic-ui-react'
import './../css/form.css'
import TextInput from './TextInput'


export default class LoginForm extends Component {
  state = {
    username: '',
    password: ''
  }

  handleInputChange = (event) => {
    const target = event.target,
          value = target.type ===
            'checkbox' ? target.checked : target.value,
          name = target.name

    this.setState({
      [name]: value
    });
  }

  onSubmit = (event) => {
    event.preventDefault()
    this.props.onSubmit(this.state.username, this.state.password)
  }

  render() {
    const errors = this.props.errors || {}

    return (
      <div className="form-container">
        <Form onSubmit={this.onSubmit} error className='form-div'>
          <h1>Authentication</h1>
          {errors.non_field_errors ? <Message
          error
          content={errors.non_field_errors}
          /> : void(0) }
          {errors.username ?
          <Message
          error
          content={errors.username}
          /> : void(0) }
          <Form.Field>
            <label>Username</label>
            <input type="text" placeholder="Username" name="username" onChange={this.handleInputChange} />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input type="password" placeholder="Password" name="password" onChange={this.handleInputChange} />
          </Form.Field>
          <Button type="submit">Login</Button>
        <div>Dont have an account yet? Apply <a href="./register">here</a> to be an IMG DJ</div>
        </Form>
        </div>
    )
  }
}
