const RECORD_VOTE = 'voting-app/voted/RECORD_VOTE'

export default function reducer(state = [], action) {
  switch (action.type) {
    case RECORD_VOTE:
      return [...state, action.pollId]
    default:
      return state
  }
}

export function recordVote(pollId) {
  return {
    type: RECORD_VOTE,
    pollId
  }
}
