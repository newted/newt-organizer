import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm, Form, Field as ReduxField } from 'redux-form'
import { withRouter } from 'react-router-dom'
import courseFields from './courseFields'
// Components
import Button from '../../components/Button'
import Field from '../../components/Field'
// Styling
import styles from './AddCourseForm.module.css'

class AddCourseForm extends Component {
  renderFields() {
    return _.map(courseFields, ({ label, name, required }) => {
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
    const { programId, handleSubmit, onSubmit, history } = this.props

    return (
      <div className={ styles.formContainer }>
        <Form
          onSubmit={
            handleSubmit(values => onSubmit(programId, values, history))
          }
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

  _.each(courseFields, ({ name, required }) => {
    if(required && !values[name]) {
      errors[name] = 'You must provide a value.'
    }
  })

  return errors
}

export default reduxForm({
  validate,
  form: 'addCourseForm'
})(withRouter((AddCourseForm)))
