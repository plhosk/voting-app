import React, { PropTypes } from 'react'
import { connect } from 'react-redux'

import {
  fetchPoll,
  deletePoll,
  hideActivePoll,
  unHideActivePoll
} from './activePollDuck'

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

  render() {

    const style = {
      code: {
        whiteSpace: 'pre'
      }
    }

    const { user, activePoll, dispatch } = this.props
    const isOwner = user ? (user.username == activePoll.owner ? true : false) : false
    if (activePoll == {}) {
      return null
    }
    if (activePoll.hasOwnProperty('hidePoll') && activePoll.hidePoll) {
      return null
    }
    return (
      <div>
        <h1>{activePoll.title}</h1>
        <h3>
          Created by: {activePoll.owner}
        </h3>
        <h4>
          at {activePoll.creationDate}
        </h4>
        <p>Full poll data:</p>
        <code style={style.code}>{JSON.stringify(activePoll, null, 2)}</code>
        <h2>
          You are {isOwner ? '' : 'NOT'} the poll's owner.
        </h2>
        {isOwner &&
          <button
            className='btn btn-danger'
            onClick={() => {dispatch(deletePoll(activePoll.pollId))}}
          >
            Delete this poll
          </button>
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
