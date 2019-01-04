import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form'
// Components
import Button from '../../components/Button'
import ProgramField from './ProgramField'
// Styling
import styles from './ProgramForm.module.css'

const FIELDS = [
  { label: 'Program Name', name: 'name' },
  { label: 'Short Name', name: 'shortname' },
  { label: 'Institution', name: 'institution' }
]

class ProgramForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return <Field
        component={ ProgramField }
        type='text'
        label={ label }
        name={ name }
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

function validate(values) {
  const errors = {}

  if (!values.name) {
    errors.name = 'You must provide a Program name.'
  }

  return errors
}

export default reduxForm({
  validate,
  form: 'programForm'
})(ProgramForm)
