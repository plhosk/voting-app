import React, { PropTypes } from 'react'
import {Link} from 'react-router'
import {connect} from 'react-redux'
import AppBar from 'material-ui/AppBar'
import FlatButton from 'material-ui/FlatButton'
import IconButton from 'material-ui/IconButton'
import ActionHome from 'material-ui/svg-icons/action/home'
import ActionAccountBox from 'material-ui/svg-icons/action/account-box'
import ActionPermIdentity from 'material-ui/svg-icons/action/perm-identity'
import PowerSettingsNew from 'material-ui/svg-icons/action/power-settings-new'
import SocialPerson from 'material-ui/svg-icons/social/person'

import { logOut } from './auth/authDuck'
import { getUserObject } from './auth/authDuck'
import { navigate } from './routerDuck'

class NavigationBar extends React.Component {
  
  componentWillMount() {
    this.props.dispatch(getUserObject())
  }

  logoutUser() {
    this.props.dispatch(logOut())
  }

  render() {
    const { user, dispatch } = this.props

    const styles = {
      appBar: {
      },
      home: {
        backgroundColor: 'transparent',
        color: 'white',
      },
      title: {
        cursor: 'pointer',
      },
      rightSpan: {
        display: 'flex',
        flexFlow: 'row wrap',

      },
      button: {
        backgroundColor: 'transparent',
        color: 'white',
        paddingTop: 6,
        marginBottom: 8,
        paddingLeft: 8,
        paddingRight: 8,
        textAlign: 'right',
        flexBasis: 300
      },
      buttonText: {
        fontSize: '1.1em'
      }
    }

    return(
      <AppBar
        style={styles.appBar}
        title={<span style={styles.title}>Voting App</span>}
        onTitleTouchTap={() => dispatch(navigate({ pathname: '/' }, 'PUSH'))}
        iconElementLeft={
            <IconButton onClick={() => dispatch(navigate({ pathname: '/' }, 'PUSH'))}>
              <ActionHome />
            </IconButton>
        }
        iconElementRight={
          <span style={styles.rightSpan}>
            {user &&
              <div>
                <Link to='/mypolls'>
                <FlatButton
                  style={styles.button}
                  labelPosition='after'
                  icon={<SocialPerson />}
                  label={<span style={styles.buttonText}>
                   {user.username}
                  </span>}
                /></Link>
                <Link to='#'>
                <FlatButton
                  style={styles.button}
                  labelPosition='after'
                  icon={<PowerSettingsNew />}
                  label={<span style={styles.buttonText}>
                    Log Out
                  </span>}
                  onClick={() => this.logoutUser()}
                /></Link>
              </div>
            }
            {!user && <Link to="/login">
              <FlatButton
                style={styles.button}
                labelPosition='after'
                icon={<ActionAccountBox />}
                label={<span style={styles.buttonText}>
                  Log In
                </span>} />
              </Link>}
            {!user && <Link to="/signup">
              <FlatButton
                style={styles.button}
                labelPosition='after'
                icon={<ActionPermIdentity />}
                label={<span style={styles.buttonText}>
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
