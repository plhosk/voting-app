import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {makeGetVisiblePolls} from 'selectors'
import {Link} from 'react-router'

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
