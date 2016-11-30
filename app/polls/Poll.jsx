import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import {reset} from 'redux-form'
import { showErrorMessage } from '../errorMessageDuck'
import { recordVote } from '../votedDuck'

import Divider from 'material-ui/Divider'
import RaisedButton from 'material-ui/RaisedButton'
import CircularProgress from 'material-ui/CircularProgress'
import SocialShare from 'material-ui/svg-icons/social/share'
import ActionDelete from 'material-ui/svg-icons/action/delete'
import ActionDone from 'material-ui/svg-icons/action/done'
import {green500} from 'material-ui/styles/colors'

import VoteForm from './VoteForm'
import PollChart from './PollChart'

import {
  fetchPoll,
  deletePoll,
  hideActivePoll,
  unHideActivePoll
} from './activePollDuck'

const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000)
    var interval = Math.floor(seconds / 31536000)
    if (interval > 1) {
        return interval + " years"
    }
    interval = Math.floor(seconds / 2592000)
    if (interval > 1) {
        return interval + " months"
    }
    interval = Math.floor(seconds / 86400)
    if (interval > 1) {
        return interval + " days"
    }
    interval = Math.floor(seconds / 3600)
    if (interval > 1) {
        return interval + " hours"
    }
    interval = Math.floor(seconds / 60)
    if (interval > 1) {
        return interval + " minutes"
    }
    return Math.floor(seconds) + " seconds"
}

const twitterShare = (title, id) => {
  const url = 'https://twitter.com/intent/tweet?text='
  let appUrl = '' + window.location.protocol + '//'
  appUrl += window.location.hostname
  let tweet = 'Vote on my poll: ' + title + ' ' + appUrl + '/polls/' + id
  window.open(url + encodeURIComponent(tweet))
}

const didVote = (voted, pollId) => {
  if (voted.find(e => e == pollId) !== undefined) {
    return true
  }
  return false
}

class Poll extends React.Component {
  componentDidMount() {
    if (this.props.params.pollId != this.props.activePoll.pollId) {
      this.props.dispatch(hideActivePoll())
      this.props.dispatch(fetchPoll(this.props.params.pollId))
    } else {
      this.props.dispatch(unHideActivePoll())
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.pollId !== this.props.params.pollId) {
      this.props.dispatch(hideActivePoll())
      this.props.dispatch(fetchPoll(nextProps.params.pollId))
    }
  }

  handleSubmit = (values) => {
    fetch('/api/polls/' + this.props.activePoll.pollId, {
      credentials: 'same-origin',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(function (response) {
      if (response.status == 200) {
          this.props.dispatch(recordVote(this.props.activePoll.pollId))
          this.props.dispatch(reset('voteSelector'))
          this.props.dispatch(fetchPoll(this.props.activePoll.pollId))
      }
      else {
        this.props.dispatch(showErrorMessage("Vote submission failed!"))
      }      
    }.bind(this))
  }

  render() {

    const styles = {
      pollDiv: {
        padding: '0 20px',
      },
      checkmark: {
        position: 'relative',
        top: 4,
      },
      buttonLink: {
        color: 'inherit', /* blue colors for links too */
        textDecoration: 'inherit' /* no underline */
      },
      chartHolder: {
        margin: 30,
      },
      title: {
        margin: 0,
        wordWrap: 'break-word',
      },
      subtitle: {
        margin: 10,
        fontSize: '0.8em',
      },
      loading: {
        padding: '20px 10px',
        fontSize: '0.8em',
      }
    }

    const { user, activePoll, voted, dispatch } = this.props

    const isOwner = user ? (user.username == activePoll.owner ? true : false) : false
    if ((!activePoll.hasOwnProperty('title')) || (activePoll.hasOwnProperty('hidePoll') && activePoll.hidePoll)) {
      return (
        <div style={styles.loading}>
          <CircularProgress size={80} thickness={5} /><br /><br />
          Loading...
        </div>
      )
    }

    return (
      <div style={styles.pollDiv}>
        <h1 style={styles.title}>
          {activePoll.title}
        </h1>
        <p style={styles.subtitle}>
          Created {timeSince(Date.parse(activePoll.creationDate))} ago by {activePoll.owner}
        </p>
        <Divider />
        {didVote(voted, activePoll.pollId) ? (
          <p style={styles.subtitle}><ActionDone color={green500} style={styles.checkmark} /> Vote received
          </p>
        ) : (
          <VoteForm
            loggedIn={user ? true : false}
            options={activePoll.options}
            onSubmit={this.handleSubmit}
            initialValues={{pollId: activePoll.pollId, }}
          />
        )}

        <div style={styles.chartHolder}>
          {activePoll.options.reduce((a, b) => a + b.votes, 0) > 0 ? (
            <PollChart options={activePoll.options} />
          ) : (
            <h4>No votes yet!</h4>
          )}
        </div>
        <RaisedButton
          label='Share on Twitter'
          style={styles.button}
          onClick={() => twitterShare(activePoll.title, activePoll.pollId)}
          icon={<SocialShare />}
        />
        { isOwner && 
          <div>
            <br />
            <RaisedButton
              label='Delete this poll'
              secondary={true}
              style={styles.button}
              onClick={() => {dispatch(deletePoll(activePoll.pollId))}}
              icon={<ActionDelete />}
            />
          </div>
        }
        { /* <div><p>Full poll data:</p>
        <code>{ JSON.stringify(activePoll) }</code></div> */}
      </div>
    )
  }
}

Poll.propTypes = {
  user: PropTypes.object,
  activePoll: PropTypes.object,
  voted: PropTypes.array,
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
    user: state.auth.user,
    activePoll: state.activePoll,
    voted: state.voted
})

export default connect(mapStateToProps)(Poll)
