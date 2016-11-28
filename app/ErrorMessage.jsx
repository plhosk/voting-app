import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { hideErrorMessage } from './errorMessageDuck'
import Paper from 'material-ui/Paper'
import IconButton from 'material-ui/IconButton'
import NavigationClose from 'material-ui/svg-icons/navigation/close'

const styles = {
  paper: {
    margin: '20px auto',
    padding: '10px 5px 10px 30px',
    maxWidth: 400,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#e44',
    color: 'white'
  }, 
  title: {
    fontSize: '1.3em',
    fontWeight: 'bold'
  }
}


const ErrorMessage = ({ errorMessage, dispatch }) => (
  <div>
    {errorMessage !== '' &&
      <Paper style={styles.paper} zDepth={2}>
        <span style={styles.title}>Error</span>
        <span>{errorMessage}</span>
        <IconButton onClick={() => {dispatch(hideErrorMessage())}}>
          <NavigationClose color={'#fff'} />
        </IconButton>
      </Paper>
    }
  </div>
)
ErrorMessage.propTypes = {
  errorMessage: PropTypes.string,
  dispatch: PropTypes.func
}

const mapStateToProps = (state) => ({
  errorMessage: state.errorMessage
})

export default connect(mapStateToProps)(ErrorMessage)
