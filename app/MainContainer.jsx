import React from 'react'
import { Match } from 'react-router'

import Paper from 'material-ui/Paper'

import NavigationBar from './NavigationBar'
import NavigationTabs from './NavigationTabs'
import ErrorMessage from './ErrorMessage'
import Index from './Index'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Polls from './polls/Polls'
import Poll from './polls/Poll'
/* import User from 'user/User' */

const styles = {
  mainDiv: {
    // paddingLeft: 'calc(100vw - 100%)'

  },
  // paperWrapper: {
  //   width: 'calc(100vw - 17px)'
  // },
  paper: {
    margin: '30px auto',
    padding: 0,
    maxWidth: 900,
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center',

  },
  contentDiv: {
    margin: 0,
    padding: '20px 0 30px 0',
  }
}

const MainContainer = () => (
  <div style={styles.mainDiv}>
    <NavigationBar />
    <div style={styles.paperWrapper}>
      <Paper style={styles.paper} zDepth={2}>
        <NavigationTabs />
        <div style={styles.contentDiv}>
          <ErrorMessage />
          <Match pattern="/" exactly component={Index}/>
          <Match pattern="/login" exactly component={Login}/>
          <Match pattern="/signup" exactly component={Signup}/>
          <Match pattern='/polls' exactly component={Polls}/>
          <Match pattern='/mypolls' exactly component={Polls}/>
          <Match pattern='/polls/:pollId' component={Poll}/>
          { /* <Match pattern='/users/:userId' component={User}/> */ }
        </div>
      </Paper>
    </div>
  </div>
)

export default MainContainer
