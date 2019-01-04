import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm, Form, Field } from 'redux-form'
import { withRouter } from 'react-router-dom'
// Components
import Button from '../../components/Button'
import ProgramField from './ProgramField'
// Styling
import styles from './ProgramForm.module.css'

const FIELDS = [
  { label: 'Program Name', name: 'name', required: true },
  { label: 'Short Name', name: 'shortname', required: false },
  { label: 'Institution', name: 'institution', required: true }
]

class ProgramForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name, required }) => {
      return <Field
        component={ ProgramField }
        type='text'
        label={ label }
        name={ name }
        required={ required }
        key={ name }
      />
    })
  }

  render() {
    const { handleSubmit, onSubmit, history } = this.props
    console.log(this.props)

    return (
      <div>
        <Form
          onSubmit={ handleSubmit(values => onSubmit(values, history)) }
        >
          { this.renderFields() }
          <Button
            text='Submit'
            type='submit'
            additionalClass={ styles.submitBtn }
          />
        </Form>
      </div>
    )
  }
}

// Input validation function
function validate(values) {
  const errors = {}

  _.each(FIELDS, ({ name, required }) => {
    if(required && !values[name]) {
      errors[name] = 'You must provide a value.'
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'programForm'
})(withRouter((ProgramForm)))
