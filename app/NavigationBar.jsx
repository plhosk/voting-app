import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'

import {removeUserObject} from 'auth/authDuck'
import { navigate } from 'routerDuck'

class NavigationBar extends React.Component {

  logoutUser() {
    this.props.dispatch(removeUserObject())
    // hashHistory.push('/')
    //location.href = '/'
    this.props.dispatch(navigate( { pathname: '/' }, 'PUSH'))

  }

  render() {
    const { user } = this.props
    return(
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <Link className="navbar-brand" to="/" >Voting App</Link>
          </div>
          <ul className="nav navbar-nav navbar-right">
            <li><Link to='/polls'>Browse Polls</Link></li>
            {user && <li><a onClick={() => this.logoutUser()}>Logout</a></li>}
            {!user && <li><Link to="/login">Log in</Link></li>}
            {!user && <li><Link to="/signup">Sign up</Link></li>}
          </ul>
        </div>
      </nav>
    )
  }
}

NavigationBar.propTypes = {
  user: PropTypes.object,
  clearUserData: PropTypes.func,
  navigate: PropTypes.func,
  dispatch: PropTypes.func
}

const mapStateToProps = state => ({
  user: state.auth.user
})

export default connect(mapStateToProps)(NavigationBar)
