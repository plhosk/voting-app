import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'

import routerReducer from './routerDuck'
import authReducer from './auth/authDuck'
import pollListReducer from './polls/pollListDuck'
import activePollReducer from './polls/activePollDuck'
import errorMessageReducer from './errorMessageDuck'


const reducer = combineReducers({
  router: routerReducer,
  auth: authReducer,
  form: formReducer,
  pollList: pollListReducer,
  activePoll: activePollReducer,
  errorMessage: errorMessageReducer
})

export default reducer
