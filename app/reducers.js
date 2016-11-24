import { combineReducers } from 'redux'

import routerReducer from 'routerDuck'
import authReducer from 'auth/authDuck'

const reducer = combineReducers({
  router: routerReducer,
  auth: authReducer
})

export default reducer
