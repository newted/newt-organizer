import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { reduxForm, Form, Field as ReduxField } from 'redux-form'
import { withRouter } from 'react-router-dom'
import assignmentFields from './assignmentFields'
// Components
import Button from '../../components/Button'
import Field from '../../components/Field'
import DateField from '../../components/DateField'
// Styling
import styles from './AddAssignmentForm.module.css'

class AddAssignmentForm extends Component {
  static propTypes = {
    programId: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired,  // React form submit func.
    history: PropTypes.object
  }

  renderFields() {
    return _.map(assignmentFields, ({ label, name, required }) => {
      return <ReduxField
        component={ name === 'dateDue' ? DateField : Field }
        type='text'
        label={ label }
        name={ name }
        required={ required }
        key={ name }
      />
    })
  }

  render() {
    const { programId, courseId, handleSubmit, onSubmit, history } = this.props

    return (
      <div className={ styles.formContainer }>
        <Form onSubmit={
          handleSubmit(values => onSubmit(programId, courseId, values, history))
        }>
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
})(withRouter(AddAssignmentForm))
