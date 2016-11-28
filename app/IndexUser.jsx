import React, {PropTypes} from 'react'

class IndexUser extends React.Component {
  render() {
    return (
      <div>
        <h2>
          Welcome, {this.props.userName}!
        </h2>
        <p>
          While logged in, you can create, edit, delete or share your own polls.
        </p>
      </div>
    )
  }
}
IndexUser.propTypes = {
  userName: PropTypes.string
}

export default IndexUser
