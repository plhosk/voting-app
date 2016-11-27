import React, { PropTypes } from 'react'
import { Field, reduxForm } from 'redux-form'
import RaisedButton from 'material-ui/RaisedButton'
import {Card, CardHeader, CardText} from 'material-ui/Card'
import { TextField } from 'redux-form-material-ui'

let NewPollForm = props => {

  const style = {
    card: {
      width: 500,
      margin: 'auto'

    },
    textField: {
      width: 400,
      fontSize: '1.2em'
    },
    button: {
      width: 400,
      marginTop: 10,
    }
  }

  const { handleSubmit, pristine, submitting } = props
  return (
    <Card style={style.card}>
      <CardHeader
        title='Create New Poll'
        actAsExpander={true}
        showExpandableButton={true}
      />
      <CardText expandable={true}>
        <form onSubmit={handleSubmit}>
          <Field
            style={style.textField}
            id='inputDefault'
            name='title'
            component={TextField}
            type='text'
            placeholder='Enter poll question'
          /><br />
          <RaisedButton
            style={style.button}
            type='submit'
            label='Create Poll'
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
