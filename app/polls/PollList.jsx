import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import { createSelector } from 'reselect'
import Paper from 'material-ui/Paper'
import { List, ListItem }  from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'

import {navigate} from '../routerDuck'

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

const style = {
  list: {
    width: 500,
    margin: '20px auto',
  },
  listItem: {

  },
}

const PollList = ({ pollList, dispatch }) => (

  <List
    style={style.list}
  >
    {(!pollList || pollList.length === 0) && (
      <h2>No polls found.</h2>)}
    {pollList && <Paper style={style.paper} zDepth={4} >
      {pollList.map(poll => (
      <div key={poll.pollId}>
        <ListItem
          primaryText={poll.title}
          rightIcon={<ActionCheckCircle />}
          onClick={() => { dispatch(navigate({ pathname: '/polls/' + poll.pollId }, 'PUSH'))}}
        />
        <Divider />
      </div>
    ))}
    </Paper>}
  </List>
)

PollList.propTypes = {
  pollList: PropTypes.array,
  dispatch: PropTypes.func
}

const makeMapStateToProps = () => {
  const getVisiblePolls = makeGetVisiblePolls()
  const mapStateToProps = (state, props) => ({
      pollList: getVisiblePolls(state, props)
  })
  return mapStateToProps
}
export default connect(makeMapStateToProps)(PollList)
