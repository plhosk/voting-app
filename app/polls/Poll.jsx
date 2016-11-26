import React, {PropTypes} from 'react'
import {connect} from 'react-redux'

import {fetchPoll} from 'polls/activePollDuck'

class Poll extends React.Component {
  componentDidMount() {
    this.props.dispatch(fetchPoll(this.props.params.pollId))
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.pollId !== this.props.params.pollId) {
      this.props.dispatch(fetchPoll(nextProps.params.pollId))
    }
  }

  render() {
    const { user, activePoll } = this.props
    if (activePoll === {}) {
      return null
    }
    return (
      <div className='container'>
        <h1>{activePoll.title}</h1>
        <h3>
          Created by: {activePoll.owner}
        </h3>
        <h4>
          at {activePoll.creationDate}
        </h4>
        <p>Full poll data:</p>
        <code>{JSON.stringify(activePoll)}</code>
        <h2>
          You are {user ? (user.username == activePoll.owner ? '' : 'NOT') : 'NOT'} the poll's owner.
        </h2>
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
