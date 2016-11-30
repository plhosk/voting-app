import React, {PropTypes} from 'react'
import {connect} from 'react-redux'
import {reset} from 'redux-form'

import { showErrorMessage } from '../errorMessageDuck'
import { fetchPollList } from './pollListDuck'

import NewPollForm from './NewPollForm'
import PollList from './PollList'
import Divider from 'material-ui/Divider'

class Polls extends React.Component {

  componentDidMount () {
    this.props.dispatch(fetchPollList())
  }

  handleSubmit = (values) => {
    fetch('/api/polls', {
      credentials: 'same-origin',
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

    const styles = {
      listTitle: {
        fontSize: '1.2em',
        margin: 10,
        marginTop: 20,
      },
    }

    const { user, pathname } = this.props
    let ownerFilter = ''
    if (pathname === '/mypolls') {
      if (user) {
        ownerFilter = user.username
      } else {
        return (<h3>Log in to see your polls!</h3>)
      }
    }

    return (
      <div>
        { user &&
          <div>
            <NewPollForm
              onSubmit={this.handleSubmit}
              initialValues={{owner: user.username}}
            />
            <Divider />
          </div>
        }
        {ownerFilter.length > 0 ? (
          <p style={styles.listTitle}>My Polls</p>
        ) : (
          <p style={styles.listTitle}>All Polls</p>
        )}
        <PollList ownerFilter={ownerFilter} />
      </div>
    )
  }
}

Polls.propTypes = {
  user: PropTypes.object,
  pathname: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    user: state.auth.user,
    pathname: state.router.location.pathname
})

export default connect(mapStateToProps)(Polls)
