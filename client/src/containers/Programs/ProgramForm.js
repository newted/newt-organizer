import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form'
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
    return (
      <div>
        <form
          onSubmit={ this.props.handleSubmit(values => console.log(values)) }
        >
          { this.renderFields() }
          <Button
            text='Submit'
            type='submit'
            additionalClass={ styles.submitBtn }
          />
        </form>
      </div>
    )
  }
}

// Input validation function
function validate(values) {
  const errors = {}

  _.each(FIELDS, ({ name, required }) => {
    if(required && !values.name) {
      errors[name] = 'You must provide a value.'
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'programForm'
})(ProgramForm)
