import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import { createSelector } from 'reselect'

const getPollList = (state) => state.pollList
const getOwnerFilter = (state, props) => props.ownerFilter

const makeGetVisiblePolls = () => {
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

const PollList = ({ pollList }) => (
  <div className='container'>
    <ul className='list-group'>
    {pollList ? pollList.map(poll => (
      <Link className='list-group-item' to={'/polls/' + poll.pollId + ''}  key={poll.pollId}>
        <li className='list-group-item'>
          {poll.title}
        </li>
      </Link>
    )) : <li className='list-group-item'>No polls found in database</li>}
    </ul>
  </div>
)

PollList.propTypes = {
  pollList: PropTypes.array
}

const makeMapStateToProps = () => {
  const getVisiblePolls = makeGetVisiblePolls()
  const mapStateToProps = (state, props) => ({
      pollList: getVisiblePolls(state, props)
  })
  return mapStateToProps
}
export default connect(makeMapStateToProps)(PollList)
