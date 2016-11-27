import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { showErrorMessage } from '../errorMessageDuck'
import { navigate } from '../routerDuck'

import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

class Signup extends React.Component {

  onFormSubmit(event) {
    event.preventDefault()
    var username = this.userInput.input.value
    var password = this.passInput.input.value
    if (username.length == 0 || password.length == 0) {
      //show username error
    }
    else {
      fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      }).then(function (response) {
        if (response.status == 200) {
          this.props.dispatch(navigate({ pathname: '/login' }, 'PUSH'))
        }
        else {
          this.props.dispatch(showErrorMessage('Sign up failed! User name may be unavailable'))
        }
      }.bind(this))
    }
  }

  render() {

    const style = {
      textField: {
        width: 200,
        fontSize: '1.2em'
      },
      button: {
        width: 200,
        marginTop: 10,
      }
    }

    return (
      <div>
        <h1>Create new account</h1>
        <form onSubmit={this.onFormSubmit.bind(this)}>
          <TextField
            style={style.textField}
            ref={username => {this.userInput = username}}
            id='username'
            type="text"
            placeholder="Username"
            required
            autoFocus
          /><br />
          <TextField
            style={style.textField}
            ref={password => {this.passInput = password}}
            id='password'
            type="password"
            placeholder="Password"
            required
          /><br />
          <RaisedButton
            style={style.button}
            type='submit'
            label="Create Account"
          />
        </form>
      </div>
    )
  }
}

Signup.propTypes = {
  navigate: PropTypes.func,
  dispatch: PropTypes.func
}

export default connect()(Signup)
