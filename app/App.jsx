// special imports that affect the entire app
import 'isomorphic-fetch'
import { polyfill } from 'es6-promise'
polyfill()
import injectTapEventPlugin from 'react-tap-event-plugin'
injectTapEventPlugin()

// other imports
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, compose } from 'redux'
import persistState from 'redux-localstorage'
import { Provider, connect } from 'react-redux'
import Router from 'react-router-addons-controlled/ControlledBrowserRouter'
import thunk from 'redux-thunk'
import freeze from 'redux-freeze'
import createBrowserHistory from 'history/createBrowserHistory'
export const history = createBrowserHistory()

import { navigate } from './routerDuck'

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import MainContainer from './MainContainer'
import rootReducer from './rootReducer'

const initialState = {
  router: {
    location: history.location,
    action: history.action
  },
  auth: {},
  voted: [],
  pollList: [],
  activePoll: {},
  errorMessage: ''
}

let middlewares = [thunk]
if (process.env.NODE_ENV !== 'production') {
  middlewares = [...middlewares, freeze]
}

let middleware = applyMiddleware(...middlewares)

middleware = compose(middleware, persistState(
  ['voted'], // ['auth', 'voted'],
  { key: 'voting-app-redux'}
))

// add the redux dev tools
if (process.env.NODE_ENV !== 'production' && window.devToolsExtension) {
  middleware = compose(middleware, window.devToolsExtension());
}

const store = createStore(rootReducer, initialState, middleware)

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
        <MuiThemeProvider>
          <MainContainer />
        </MuiThemeProvider>
      </Router>
    )
  }
}

const mapStateToProps = state => ({
  location: state.router.location,
  action: state.router.action
})

const App = connect(mapStateToProps)(AppComponent)

ReactDOM.render(
  <Provider store={store}><App /></Provider>,
  document.getElementById('app')
)
