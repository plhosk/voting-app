import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {reset} from 'redux-form'

import { showErrorMessage } from '../errorMessageDuck'
import { fetchPollList } from './pollListDuck'

import NewPollForm from './NewPollForm'
import PollList from './PollList'

class Polls extends React.Component {

  componentDidMount () {
    this.props.dispatch(fetchPollList())
  }

  handleSubmit = (values) => {
    fetch('/api/polls', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    }).then(function (response) {
      if (response.status == 200) {
          this.props.dispatch(reset('newPoll'))
          this.props.dispatch(fetchPollList())
      }
      else {
        this.props.dispatch(showErrorMessage("Poll submission failed!"))
      }
    }.bind(this))
  }
  render() {
    const { user } = this.props
    return (
      <div>
        {user && <NewPollForm
          onSubmit={this.handleSubmit}
          initialValues={{owner: user.username}}
        />}
        <PollList ownerFilter='' />
      </div>
    )
  }
}

Polls.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func
}

const mapStateToProps = state => ({
    user: state.auth.user
})

export default connect(mapStateToProps)(Polls)