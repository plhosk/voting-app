import React from 'react'
import { Match } from 'react-router'

import Paper from 'material-ui/Paper'

import NavigationBar from './NavigationBar'
import ErrorMessage from './ErrorMessage'
import Index from './Index'
import Login from './auth/Login'
import Signup from './auth/Signup'
import Polls from './polls/Polls'
import Poll from './polls/Poll'
/* import User from 'user/User' */

const style = {
  paper: {
    margin: '30px auto',
    padding: 30,
    maxWidth: 900,
    backgroundColor: 'white',
    color: 'black',
    textAlign: 'center'
  }
}

const MainContainer = () => (
  <div>
    <NavigationBar />
    <Paper style={style.paper} zDepth={2}>
      <ErrorMessage />
      <Match pattern="/" exactly component={Index}/>
      <Match pattern="/login" exactly component={Login}/>
      <Match pattern="/signup" exactly component={Signup}/>
      <Match pattern='/polls' exactly component={Polls}/>
      <Match pattern='/polls/:pollId' component={Poll}/>
      { /* <Match pattern='/users/:userId' component={User}/> */ }
    </Paper>
  </div>
)

export default MainContainer
