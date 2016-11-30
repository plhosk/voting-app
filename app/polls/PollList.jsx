import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {Match} from 'react-router'
import { createSelector } from 'reselect'
import CircularProgress from 'material-ui/CircularProgress'
import Paper from 'material-ui/Paper'
import { List, ListItem }  from 'material-ui/List'
import Divider from 'material-ui/Divider'
import ActionDone from 'material-ui/svg-icons/action/done'
import SocialPoll from 'material-ui/svg-icons/social/poll'
import {green500, cyan500} from 'material-ui/styles/colors'

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

const votedCheckmark = (voted, pollId) => {
  if (voted.find(e => e == pollId) !== undefined) {
    return <ActionDone color={green500} />
  }
  return <span />
}

const styles = {
  list: {
    maxWidth: 500,
    margin: '0 auto',
    padding: 0,
  },
  listItem: {
    textAlign: 'left',
    fontSize: '1em',
    lineHeight: '1.2em',
    wordWrap: 'break-word',
  },
  empty: {
    padding: '20px 10px',
    fontSize: '0.8em',
  },
}

const PollList = ({ pollList, voted, dispatch }) => {

  if (!pollList || pollList.length === 0) {
    return (
      <div>
        
        <Match pattern='/polls' exactly render={() => (
          <div style={styles.empty}>
            <CircularProgress size={80} thickness={5} /><br /><br />
            Loading...
          </div>
        )}/>
        <Match pattern='/mypolls' exactly render={() => (
          <div style={styles.empty}>You haven't created any polls yet</div>

        )}/>
        
      </div>
    )
  }

  return (
    <List
      style={styles.list}
    >
      <Paper style={styles.paper} zDepth={4} >
        {pollList.map(poll => (
        <div key={poll.pollId}>
          <ListItem
            style={styles.listItem}
            primaryText={
              poll.title.length > 140 ? poll.title.slice(0, 139) + '...' : poll.title
            }
            secondaryText={`Created ${
              timeSince(Date.parse(poll.creationDate))} ago by ${poll.owner}`}
            leftIcon={<SocialPoll color={cyan500} />}
            rightIcon={votedCheckmark(voted, poll.pollId)}
            onClick={() => { dispatch(navigate({ pathname: '/polls/' + poll.pollId }, 'PUSH'))}}
          />
          <Divider />
        </div>
      ))}
      </Paper>
    </List>
  )
}

PollList.propTypes = {
  pollList: PropTypes.array,
  voted: PropTypes.array,
  dispatch: PropTypes.func
}

const makeMapStateToProps = () => {
  const getVisiblePolls = makeGetVisiblePolls()
  const mapStateToProps = (state, props) => ({
      pollList: getVisiblePolls(state, props),
      voted: state.voted
  })
  return mapStateToProps
}
export default connect(makeMapStateToProps)(PollList)
