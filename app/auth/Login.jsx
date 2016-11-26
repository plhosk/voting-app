import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {updateUserObject} from 'auth/authDuck'
import {navigate} from 'routerDuck'
import 'isomorphic-fetch'

class LoginComponent extends React.Component {
    onLoginSubmit(event) {
        event.preventDefault()

        var username = this.refs.username.value
        var password = this.refs.password.value

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
                        // hashHistory.push('/')
                        //location.href = '/'
                        this.props.dispatch(navigate({ pathname: '/' },'PUSH'))
                    }.bind(this))
                }
                else {
                    alert("Login failed")
                }
            }.bind(this))
        }
    }

    render() {
        if(this.props.user) {
            return <div className="container"><h1>You are logged already in!</h1></div>
        }

        return (
            <div className="container">
                <h1>Log in</h1>
                <form onSubmit={this.onLoginSubmit.bind(this)}>
                    <input ref="username" type="text" className="form-control" placeholder="Username" required
                           autoFocus/>
                    <input ref="password" type="password" className="form-control" placeholder="Password" required/>
                    <input type="submit" value="Log in" className="btn btn-primary btn-block"/>
                </form>
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