import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Link} from 'react-router'
import { createSelector } from 'reselect'
import Paper from 'material-ui/Paper'
import { List, ListItem }  from 'material-ui/List'
import Divider from 'material-ui/Divider'
import CircularProgress from 'material-ui/CircularProgress'
// import ActionCheckCircle from 'material-ui/svg-icons/action/check-circle'
import SocialPoll from 'material-ui/svg-icons/social/poll'

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

const timeSince = (date) => {

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
        return interval + " years";
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
        return interval + " months";
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
        return interval + " days";
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
        return interval + " hours";
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
        return interval + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}

const styles = {
  list: {
    maxWidth: 500,
    margin: '0 auto',
  },
  listItem: {
    textAlign: 'left',
    fontSize: '1em',
    lineHeight: '1.2em'
  },
}

const PollList = ({ pollList, dispatch }) => (

  <List
    style={styles.list}
  >
    {(!pollList || pollList.length === 0) && (
      <div>
        {/* <CircularProgress size={80} thickness={5} /><br /> */}
        Poll list is empty
      </div>)}
    {pollList && <Paper style={styles.paper} zDepth={4} >
      {pollList.map(poll => (
      <div key={poll.pollId}>
        <ListItem
          style={styles.listItem}
          primaryText={poll.title}
          secondaryText={`Created ${
            timeSince(Date.parse(poll.creationDate))} ago by ${poll.owner}`}
          leftIcon={<SocialPoll />}
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
