import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

import Github from './Github'

import { showErrorMessage } from '../errorMessageDuck'
import { updateUserObject} from './authDuck'
import { navigate } from '../routerDuck'

class LoginComponent extends React.Component {

  onLoginSubmit(event) {
    event.preventDefault()
    var username = this.userInput.input.value
    var password = this.passInput.input.value
    if (username.length == 0 || password.length == 0) {
      //show input error
    }
    else {
      fetch('/api/login', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: username,
          password: password,
        })
      }).then(function (response) {

        if(response.status == 200) {
          response.json().then(function(user) {
            this.props.dispatch(updateUserObject(user))
            this.props.dispatch(navigate({ pathname: '/' },'PUSH'))
          }.bind(this))
        }
        else {
          this.props.dispatch(showErrorMessage('Login failed. User name or password may be incorrect'))
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
    }

    if(this.props.user) {
      return (
        <div>
          <h1>You are already logged in!</h1>
        </div>
      )
    }

    return (
      <div>
        <div>
          <h1>Log in</h1>
          <form onSubmit={this.onLoginSubmit.bind(this)}>
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
              label='Log in'
            />
          </form>
        </div>
        <br />
        <Github />
      </div>
    )
  }
}

LoginComponent.propTypes = {
  user: PropTypes.object,
  updateUserObject: PropTypes.func,
  navigate: PropTypes.func,
  dispatch: PropTypes.func
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(LoginComponent)