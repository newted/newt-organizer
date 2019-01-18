import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm, Form, Field as ReduxField } from 'redux-form'
import assignmentFields from './assignmentFields'
// Components
import Button from '../../components/Button'
import Field from '../../components/Field'
// Styling
import styles from './AddAssignmentForm.module.css'

class AddAssignmentForm extends Component {
  renderFields() {
    return _.map(assignmentFields, ({ label, name, required }) => {
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
    const { handleSubmit } = this.props

    return (
      <div className={ styles.formContainer }>
        <Form onSubmit={ handleSubmit(values => console.log(values)) }>
          { this.renderFields() }
          <Button
            type='submit'
            additionalClass={ styles.submitBtn }
          >
            Submit
          </Button>
        </Form>
      </div>
    )
  }
}

// Input validation function
function validate(values) {
  const errors = {}

  _.each(assignmentFields, ({ name, required }) => {
    if(required && !values[name]) {
      errors[name] = 'You must provide a value.'
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'addAssignmentForm'
})(AddAssignmentForm)
