import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider, connect } from 'react-redux'
import Router from 'react-router-addons-controlled/ControlledBrowserRouter'
import thunk from 'redux-thunk'
import freeze from 'redux-freeze'
import createBrowserHistory from 'history/createBrowserHistory'
const history = createBrowserHistory()

import MainContainer from 'MainContainer'
import rootReducer from 'rootReducer'
import { navigate } from 'routerDuck'

const initialState = {
  router: {
    location: history.location,
    action: history.action
  },
  auth: {},
  pollList: [],
  activePoll: {}
}

let middleware = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middleware = [...middleware, freeze]
}

const store = createStore(
  rootReducer, initialState,
  compose(
    applyMiddleware(...middleware),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

class AppComponent extends React.Component {

  static propTypes = {
    location: PropTypes.object,
    action: PropTypes.string,
    navigate: PropTypes.func,
    dispatch: PropTypes.func
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
            this.props.dispatch(navigate(location, this.props.action))
          } else if (!window.block) {
            // if you want to block transitions go into the console and type in
            // `window.block = true` and transitions won't happen anymore
            this.props.dispatch(navigate(location, action))
          } else {
            console.log('blocked!') // eslint-disable-line
          }
        }}
      >
        
        <MainContainer />
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  location: state.router.location,
  action: state.router.action
})

const App = connect(mapStateToProps)(AppComponent)

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
