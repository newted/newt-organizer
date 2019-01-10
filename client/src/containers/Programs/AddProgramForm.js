import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm, Form, Field as ReduxField } from 'redux-form'
import { withRouter } from 'react-router-dom'
import programFields from './programFields'
// Components
import Button from '../../components/Button'
import Field from '../../components/Field'
// Styling
import styles from './AddProgramForm.module.css'

class ProgramForm extends Component {
  renderFields() {
    return _.map(programFields, ({ label, name, required }) => {
      return <ReduxField
        component={ Field }
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

  _.each(programFields, ({ name, required }) => {
    if(required && !values[name]) {
      errors[name] = 'You must provide a value.'
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'addProgramForm'
})(withRouter((ProgramForm)))
