const POPULATE_POLL_LIST = 'voting-app/pollList/POPULATE_POLL_LIST'

export default function reducer(state = [], action) {
  switch (action.type) {
    case POPULATE_POLL_LIST:
      return action.pollList
    default:
      return state
  }
}

export function fetchPollList() {
  return function (dispatch) {
    return fetch('/api/polls', {
      credentials: 'same-origin'
    }).then((response) => {
      if (response.status == 200) {
        response.json()
          .then((pollList) => {
            dispatch({
              type: POPULATE_POLL_LIST,
              pollList
            })
          })
      }
    })
  }
}



