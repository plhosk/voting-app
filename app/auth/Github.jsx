import React from 'react'
import Divider from 'material-ui/Divider'
import Paper from 'material-ui/Paper'

const styles = {
  githubImg: {
    verticalAlign: 'middle',
    width: 64,
    height: 64,
    opacity: 0.8,
  },
  githubPaper: {
    display: 'inline-block',
    margin: 10,
    borderStyle: 'solid',
    borderColor: 'rgba(255,255,255,0)',
    borderWidth: 12,
    borderRadius: 100,
  },
  githubP: {
    marginBottom: 0,
  }
}

const Github = () => (
  <div>
    <Divider />
    <p style={styles.githubP}>Or, click to authenticate using your GitHub account:</p>
    <Paper style={styles.githubPaper} zDepth={3}>
      <a href='/api/github'>
        <img
          style={styles.githubImg}
          src='/github.png'
          alt='GitHub'
        />
      </a>
    </Paper>
  </div>
)


export default Github
