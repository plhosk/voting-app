import { combineReducers } from 'redux'

import routerReducer from 'redux/router'
import authenticationReducer from 'redux/authentication'

const reducer = combineReducers({
  router: routerReducer,
  authentication: authenticationReducer
})

export default reducer
