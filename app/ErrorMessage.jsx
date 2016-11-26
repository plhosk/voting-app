import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { hideErrorMessage } from 'errorMessageDuck'

const ErrorMessage = ({ errorMessage, dispatch }) => (
  <div className='container'>
    {errorMessage !== '' &&
      <div>
        <div className='col-sm-3'></div>
        <div className='col-sm-6 alert alert-dismissible alert-danger'>
          <button type='button' onClick={() => {dispatch(hideErrorMessage())}}
            className='close' data-dismiss='alert'>
            &times;
          </button>
          <h4>Error</h4>
          <p>{errorMessage}</p>
        </div>
        <div className='col-sm-3'></div>
      </div>
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
