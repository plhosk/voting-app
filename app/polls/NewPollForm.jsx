import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'

let NewPollForm = props => {
  const { handleSubmit, pristine, submitting } = props
  return (
    <div className='container'>
      <form className='form-horizontal' onSubmit={handleSubmit}>
        <fieldset>
          <legend>Start a New Poll</legend>
          <div className='form-group'>
            <div>
              <Field
                className='form-control'
                id='inputDefault'
                name='title'
                component='input'
                type='text'
                placeholder='Enter poll question'
              />
            </div>
            <div>
              <button
                className='btn btn-primary'
                type='submit'
                disabled={pristine || submitting}
              >
                Create Poll
              </button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}
NewPollForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

// const mapStateToProps = state => ({
//   initialValues: {
//     owner: state.auth.user.username
//   }
// })

NewPollForm = reduxForm({
  form: 'newPoll'
})(NewPollForm)

// export default connect(mapStateToProps)(NewPollForm)
export default NewPollForm