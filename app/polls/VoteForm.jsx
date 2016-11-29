import React, {PropTypes} from 'react'

import Paper from 'material-ui/Paper'
import { Field, reduxForm } from 'redux-form'
import {RadioButton} from 'material-ui/RadioButton'
import {RadioButtonGroup, TextField} from 'redux-form-material-ui'
import RaisedButton from 'material-ui/RaisedButton'

let VoteForm = props => {

  const styles = {
    paper: {
      maxWidth: 400,
      padding: '10px 30px',
      margin: '20px auto',
    },
    radioButtonGroup: {
    },
    radioButton: {
      textAlign: 'left',
      whiteSpace: 'wrap',
      padding: 8,
    },
    radioButtonAdd: {
      textAlign: 'left',
      whiteSpace: 'wrap',
      padding: 8,
      display: props.loggedIn ? 'block' : 'none',
    },
    submitButton: {
      margin: 12,
    },
    textField: {
      fontSize: '1.1em',
      display: props.loggedIn ? 'block' : 'none',
    }
  }

  const { options, handleSubmit, pristine, submitting } = props

  return (
    <Paper style={styles.paper} zDepth={1}>
      <form onSubmit={handleSubmit}>
        <Field
          style={styles.radioButtonGroup}
          name='voteSelector'
          component={RadioButtonGroup}
        >
          { options.map(option => (
            <RadioButton
              style={styles.radioButton}
              key={option._id}
              value={option._id}
              label={option.text}
            />
          ))}
          <RadioButton
            style={styles.radioButtonAdd}
            value='addOption'
            label='Add a new option...'
          />
        </Field>
        <Field
          style={styles.textField}
          name='newOptionText'
          component={TextField}
          placeholder='New option'
        />
        <RaisedButton
          style={styles.submitButton}
          type='submit'
          label='Submit Vote'
          primary={true}
          disabled={pristine || submitting}
        />
      </form>
    </Paper>
  )
}

VoteForm.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
  options: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

VoteForm = reduxForm({
  form: 'voteForm'
})(VoteForm)

export default VoteForm
