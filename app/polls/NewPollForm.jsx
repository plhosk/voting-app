import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import { TextField } from 'redux-form-material-ui'

let NewPollForm = props => {

  const styles = {
    card: {
      maxWidth: 500,
      margin: 'auto',
      marginBottom: 20,
    },
    textField: {
      // maxWidth: 400,
      display: 'inline-block',
      fontSize: '1.2em',
      width: '75%',
      minWidth: 200
    },
    fieldLabel: {
      display: 'inline-block',
      width: '25%',
      fontWeight: 'bold',
      minWidth: 100,
      marginTop: 30
    },
    note: {

    },
    button: {
      // width: 400,
      // maxWidth: 400,
      marginTop: 30,
    }
  }

  const { handleSubmit, pristine, submitting } = props
  return (
    <Card style={styles.card}>
      <CardHeader
        title='Click to create a new poll'
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <form onSubmit={handleSubmit}>
          <span style={styles.fieldLabel}>Poll Question</span>
          <Field
            style={styles.textField}
            // id='inputDefault'
            name='title'
            component={TextField}
            type='text'
            placeholder='Enter a question'
          />
          <br />
          <span style={styles.fieldLabel}>Choices</span>
          <Field
            style={styles.textField}
            // id='option1'
            name={'optionsCommaSep'}
            component={TextField}
            type='text'
            placeholder='Enter at least two choices'
          />
          <br />
          <span style={styles.note}>
            Separate choices with a comma
          </span>
          <br />
          <RaisedButton
            style={styles.button}
            type='submit'
            label='Create Poll'
            primary={true}
            disabled={pristine || submitting}
          />
        </form>
      </CardText>
    </Card>
  )
}
NewPollForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  pristine: PropTypes.bool.isRequired,
  submitting: PropTypes.bool.isRequired
}

NewPollForm = reduxForm({
  form: 'newPoll'
})(NewPollForm)

export default NewPollForm
