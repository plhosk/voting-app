import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import Router from 'react-router-addons-controlled/ControlledBrowserRouter'
import { Match } from 'react-router'
import freeze from 'redux-freeze' // remove in production version
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

import MainContainer from 'MainContainer'
import Index from 'Index'
import Login from 'Login'
import Signup from 'Signup'

import reducer from 'redux/reducer'

import { navigate } from 'redux/router'

const initialState = {
  router: {
    location: history.location,
    action: history.action
  },
  authentication: {}
}

const store = createStore(
  reducer, initialState,
  compose(
    applyMiddleware(freeze),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

const App = connect((state) => {
  return {
    location: state.router.location,
    action: state.router.action
  }
},
(dispatch) => {
  return {
    navigate: (location, action) => dispatch(navigate(location, action))
  }
}
)(class App extends React.Component {

  static propTypes = {
    location: PropTypes.object,
    action: PropTypes.string,
    navigate: PropTypes.func,
  }

  render() {
    return (
      <Router
        history={history}
        location={this.props.location}
        action={this.props.action}
        onChange={(location, action) => {
          // you must always dispatch a `SYNC` action,
          // because, guess what? you can't actual control the browser history!
          // anyway, use your current action not "SYNC"
          if (action === 'SYNC') {
            this.props.navigate(location, this.props.action)
          } else if (!window.block) {
            // if you want to block transitions go into the console and type in
            // `window.block = true` and transitions won't happen anymore
            this.props.navigate(location, action)
          } else {
            console.log('blocked!') // eslint-disable-line
          }
        }}
      >
        
        <MainContainer>
          <Match pattern="/" exactly component={Index}/>
          <Match pattern="/login" exactly component={Login}/>
          <Match pattern="/signup" exactly component={Signup}/>
        </MainContainer>
      </Router>
    )
  }
})

// <Router
//   history={history}                  // the history object to listen to

//   location={location}                // the location to navigate to

//   action={action}                    // the action to use: "PUSH" || "REPLACE", 

//   onChange={(location, action) => {  // called when the user clicks
//                                      // back/forward buttons
//                                      // if you get a "SYNC" action
//                                      // YOU MUST ACCEPT IT INTO YOUR STATE
//                                      // otherwise it's all busted
//   }}

//   {...additionalRouterProps}         // all other props supported by the
//                                      // uncontrolled "sister" router
// />

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
)
