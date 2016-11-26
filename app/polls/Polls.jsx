import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import 'isomorphic-fetch'

import { fetchPollList } from 'polls/pollListDuck'

import NewPollForm from 'polls/NewPollForm'
import PollList from 'polls/PollList'

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
          this.props.dispatch(fetchPollList())
      }
      else {
          alert("Poll submission failed!")
      }
    }.bind(this))
  }
  render() {
    const { user } = this.props
    return (
      <div className='container'>
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
