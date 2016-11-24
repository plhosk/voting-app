import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import {removeUserObject} from 'auth/authDuck'
import { navigate } from 'routerDuck'

class NavigationBar extends React.Component {

    logoutUser() {
        this.props.clearUserData()
        // hashHistory.push('/')
        //location.href = '/'
        this.props.navigate( { pathname: '/' }, 'PUSH')

    }

    navBarContent(user) {
        if(user) {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li><a onClick={() => this.logoutUser().bind(this)}>Logout</a></li>
                </ul>)
        }
        else {
            return (
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to="/auth/login">Log in</Link></li>
                    <li><Link to="/auth/signup">Sign up</Link></li>
                </ul>)
        }
    }
    render() {
        return(
            <nav className="navbar navbar-default">
                <div className="container">
                    <div className="navbar-header">
                        <Link className="navbar-brand" to="/" >React Boilerplate</Link>
                    </div>
                    {this.navBarContent(this.props.user)}
                </div>
            </nav>
        )
    }
}

NavigationBar.propTypes = {
  user: PropTypes.object,
  clearUserData: PropTypes.func,
  navigate: PropTypes.func
}

const mapStateToProps = state => ({
    user: state.auth.user
})

const mapDispatchToProps = dispatch => ({
    clearUserData: () => dispatch(removeUserObject()),
    navigate: (location, action) => dispatch(navigate(location, action))
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)