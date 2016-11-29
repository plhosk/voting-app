import React from 'react'

const styles = {
  list: {
    maxWidth: 550,
    margin: '0 auto',
    textAlign: 'left',
  }
}

class IndexGuest extends React.Component {
  render() {
    return (
      <div>
        <h2>
          Welcome to Voting App.
        </h2>
        <div style={styles.list}>
          <ul>
            <li>Vote on user-submitted polls.</li>
            <li>Create an account and log in to submit your own poll!</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default IndexGuest
