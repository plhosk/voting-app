import React from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import {removeUserObject} from 'AuthenticationActions'


class NavigationBar extends React.Component {

    logoutUser() {
        this.props.clearUserData()
        // hashHistory.push('/')
        //location.href = '/'
        this.props.dispatch({
          type: 'NAVIGATE',
          location: { pathname: '/' },
          action: 'PUSH'
        })
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
                    <li><Link to="/login">Log in</Link></li>
                    <li><Link to="/signup">Sign up</Link></li>
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

const mapStateToProps = state => ({
    user: state.authentication.user
})

const mapDispatchToProps = dispatch => ({
    clearUserData: () => dispatch(removeUserObject())
})

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar)