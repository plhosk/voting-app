import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import RaisedButton from 'material-ui/RaisedButton'
import SocialShare from 'material-ui/svg-icons/social/share'
import ActionDelete from 'material-ui/svg-icons/action/delete'

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

  twitterShare() {
    const url = 'https://twitter.com/intent/tweet?text='
    const title = this.props.activePoll.title
    let appUrl = '' + window.location.protocol + '//'
    appUrl += window.location.hostname
    const id = this.props.activePoll.pollId
    let tweet = 'Vote on my poll: ' + title + ' ' + appUrl + '/polls/' + id
    window.open(url + encodeURIComponent(tweet))
  }

  render() {

    const styles = {
      buttonLink: {
        color: 'inherit', /* blue colors for links too */
        textDecoration: 'inherit' /* no underline */
      },
      button: {
      },
    }

    const { user, activePoll, dispatch } = this.props
    const isOwner = user ? (user.username == activePoll.owner ? true : false) : false
    if (!activePoll.hasOwnProperty('title')) {
      return null
    }
    if (activePoll.hasOwnProperty('hidePoll') && activePoll.hidePoll) {
      return null
    }
    const chartData = []
    activePoll.options.map((option) => {
      chartData.push({
        key: option.votes + ' votes - ' + option.text,
        value: option.votes })
    })

    return (
      <div>

        <h1>{activePoll.title}</h1>
        <h5>
          Created {timeSince(Date.parse(activePoll.creationDate))} ago by {activePoll.owner}
        </h5>

        <PollChart data={chartData} />

        { /* <p>Full poll data:</p>
        <code>{ JSON.stringify(activePoll) }</code> */ }
        
        { /* isOwner && */ // TODO CHANGE BACK
          <div>
            <RaisedButton
              label='Share on Twitter'
              style={styles.button}
              onClick={this.twitterShare.bind(this)}
              icon={<SocialShare />}
            />
            <RaisedButton
              label='Delete this poll'
              secondary={true}
              style={styles.button}
              onClick={() => {dispatch(deletePoll(activePoll.pollId))}}
              icon={<ActionDelete />}
            />
          </div>
        }
      </div>
    )
  }
}

Poll.propTypes = {
  user: PropTypes.object,
  activePoll: PropTypes.object,
  params: PropTypes.object.isRequired,
  dispatch: PropTypes.func,
}

const mapStateToProps = state => ({
    user: state.auth.user,
    activePoll: state.activePoll
})

export default connect(mapStateToProps)(Poll)
