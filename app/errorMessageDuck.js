import { NAVIGATE } from './routerDuck'

const SHOW_ERROR_MESSAGE = 'voting-app/errorMessage/SHOW_ERROR_MESSAGE'
const HIDE_ERROR_MESSAGE = 'voting-app/errorMessage/HIDE_ERROR_MESSAGE'

export default function errorMessageReducer(state = '', action) {
  switch (action.type) {
    case SHOW_ERROR_MESSAGE:
      return action.message
    case HIDE_ERROR_MESSAGE:
    case NAVIGATE:
      return ''
    default:
      return state
  }
}

export function showErrorMessage(message) {
  return { type: SHOW_ERROR_MESSAGE, message }
}

export function hideErrorMessage() {
  return { type: HIDE_ERROR_MESSAGE }
}
