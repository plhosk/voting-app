import { createSelector } from 'reselect'

const getPollList = (state) => state.pollList
const getOwnerFilter = (state, props) => props.ownerFilter

export const makeGetVisiblePolls = () => {
  return createSelector(
    [getPollList, getOwnerFilter],
    (pollList, ownerFilter) => {
      if (ownerFilter === '') {
        return pollList
      }
      return pollList.filter(poll => poll.owner === ownerFilter ? true : false )
    }
  )
}
