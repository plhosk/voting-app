import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import { showErrorMessage } from '../errorMessageDuck'
import { navigate } from '../routerDuck'

import Github from './Github'

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

    const styles = {
      textField: {
        maxWidth: 200,
        fontSize: '1.2em'
      },
      button: {
        maxWidth: 200,
        marginTop: 10,
      },
      githubImg: {
        verticalAlign: 'middle',
        width: 96,
        height: 96,
        opacity: 0.8,
      },
      githubPaper: {
        display: 'inline-block',
        margin: 10,
      },
    }

    return (
      <div>
        <div>
          <h1>Create new account</h1>
          <form onSubmit={this.onFormSubmit.bind(this)}>
            <TextField
              style={styles.textField}
              ref={username => {this.userInput = username}}
              id='username'
              type="text"
              placeholder="Username"
              required
              autoFocus
            /><br />
            <TextField
              style={styles.textField}
              ref={password => {this.passInput = password}}
              id='password'
              type="password"
              placeholder="Password"
              required
            /><br />
            <RaisedButton
              style={styles.button}
              type='submit'
              label="Create Account"
            />
          </form>
        </div>
        <br />
        <Github />
      </div>
    )
  }
}

Signup.propTypes = {
  navigate: PropTypes.func,
  dispatch: PropTypes.func
}

export default connect()(Signup)
