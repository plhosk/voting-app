import React from 'react'

const styles = {
  list: {
    maxWidth: 550,
    margin: '0 auto',
    textAlign: 'left',
  },
  li: {
    // lineHeight: '1em',
    paddingTop: 10,
  },
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
            <li style={styles.li}>Vote on user-submitted polls.</li>
            <li style={styles.li}>Create an account and log in to submit your own poll!</li>
          </ul>
        </div>
      </div>
    )
  }
}

export default IndexGuest
