import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import ActionAccountBox from 'material-ui/svg-icons/action/account-box'
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity'

import {removeUserObject} from './auth/authDuck'
import { navigate } from './routerDuck'

class NavigationBar extends React.Component {

  logoutUser() {
    this.props.dispatch(removeUserObject())
    this.props.dispatch(navigate( { pathname: '/' }, 'PUSH'))

  }

  render() {
    const { user, dispatch } = this.props

    const style = {
      title: {
        cursor: 'pointer',
      },
      button: {
        backgroundColor: 'transparent',
        color: 'white',
        paddingTop: 6,
        paddingLeft: 30
      },
      buttonText: {
        fontSize: '1.3em'
      }
    }

    return(
      <AppBar
        title={<span style={style.title}>Voting App</span>}
        onTitleTouchTap={() => dispatch(navigate({ pathname: '/' }, 'PUSH'))}
        iconElementLeft={<IconButton><ActionHome /></IconButton>}
        iconElementRight={
          <span>
            <Link to='/polls'>
              <FlatButton
                style={style.button}
                labelPosition='after'
                icon={<ActionCheckCircle />}
                label={<span style={style.buttonText}>
                Browse Polls
              </span>} />
            </Link>
            {user && <FlatButton
              style={style.button}
              label={<span style={style.buttonText}>
                Log Out
              </span>}
              onClick={() => this.logoutUser()} />}
            {!user && <Link to="/login">
              <FlatButton
                style={style.button}
                labelPosition='after'
                icon={<ActionAccountBox />}
                label={<span style={style.buttonText}>
                Log In
              </span>} /> 
            </Link>}
            {!user && <Link to="/signup">
              <FlatButton
                style={style.button}
                labelPosition='after'
                icon={<ActionPermIdentity />}
                label={<span style={style.buttonText}>
                Sign Up
              </span>} />
            </Link>}
          </span>
        }
      />
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
