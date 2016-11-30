import { showErrorMessage } from '../errorMessageDuck'
import { history } from '../App'

const UPDATE_ACTIVE_POLL = 'voting-app/activePoll/UPDATE_ACTIVE_POLL'
const HIDE_ACTIVE_POLL = 'voting-app/activePoll/HIDE_ACTIVE_POLL'
const UNHIDE_ACTIVE_POLL = 'voting-app/activePoll/UNHIDE_ACTIVE_POLL'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_ACTIVE_POLL:
      return action.poll
    case HIDE_ACTIVE_POLL:
      return {
        ...state,
        hidePoll: true
      }
    case UNHIDE_ACTIVE_POLL:
      return {
        ...state,
        hidePoll: false
      }
      
    default:
      return state
  }
}

export function fetchPoll(pollId) {
  return function (dispatch) {
    return fetch('/api/polls/' + pollId, {
      credentials: 'same-origin'
    })
      .then((response) => {
        if (response.status == 400) {
          dispatch(showErrorMessage(`Poll ${pollId} does not exist.`))
        }
        else if (response.status == 200) {
          response.json()
            .then((poll) => {
              dispatch(updateActivePoll(poll))
            })
        }
      })
  }
}

export function deletePoll(pollId) {
  return function (dispatch) {
    return fetch('/api/polls/' + pollId, {
      method: 'DELETE',
      credentials: 'same-origin'
    })
      .then((response) => {
        if (response.status == 400) {
          dispatch(showErrorMessage(`Poll ${pollId} does not exist.`))
        }
        else if (response.status == 200) {
          dispatch(updateActivePoll({}))
          history.goBack()
        }
      })
  }
}

export function updateActivePoll(poll) {
  return { type: UPDATE_ACTIVE_POLL, poll }
}
export function hideActivePoll() {
  return { type: HIDE_ACTIVE_POLL }
}
export function unHideActivePoll() {
  return { type: UNHIDE_ACTIVE_POLL }
}
