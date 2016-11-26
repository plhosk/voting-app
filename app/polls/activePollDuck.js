import 'isomorphic-fetch'

const UPDATE_ACTIVE_POLL = 'voting-app/activePoll/UPDATE_ACTIVE_POLL'

export default function reducer(state = {}, action) {
  switch (action.type) {
    case UPDATE_ACTIVE_POLL:
      return action.poll
    default:
      return state
  }
}

export function fetchPoll(pollId) {
  return function (dispatch) {
    return fetch('/api/polls/' + pollId).then((response) => {
      if (response.status == 200) {
        response.json()
          .then((poll) => {
            dispatch({
              type: UPDATE_ACTIVE_POLL,
              poll
            })
          })
      }
    })
  }
}
