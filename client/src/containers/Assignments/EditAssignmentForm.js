import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import moment from 'moment'
import assignmentFields from './assignmentFields'
// Components
import { reduxForm, Form, Field as ReduxField } from 'redux-form'
import Button from '../../components/Button'
import Field from '../../components/Field'
import DateField from '../../components/DateField'
// Styling
import styles from './EditAssignmentForm.module.css'

const EditAssignmentForm = ({ assignment, onSubmit }) => {
  if (!assignment) {
    return <LoadingBar />
  }

  class EditAssignmentFormComponent extends Component {
    static propTypes = {
      assignment: PropTypes.shape({
        programId: PropTypes.string,
        courseId: PropTypes.string,
        completed: PropTypes.bool,
        inProgress: PropTypes.bool,
        dateCreated: PropTypes.string,
        dateDue: PropTypes.string,
        name: PropTypes.string,
        _id: PropTypes.string
      }).isRequired,
      handleSubmit: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
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
      const { handleSubmit, onSubmit, history } = this.props

      return (
        <div className={ styles.formContainer }>
          <Form
            onSubmit={ handleSubmit(values =>
              onSubmit(
                assignment.programId,
                assignment.courseId,
                assignment._id,
                values,
                history
              )
            ) }
          >
            { this.renderFields() }
            <Button
              type='submit'
              additionalClass={ styles.updateBtn }
            >
              Update
            </Button>
          </Form>
        </div>
      )
    }
  }

  EditAssignmentFormComponent = reduxForm({
    form: 'editCourseForm',
    initialValues: {
      name: assignment.name,
      details: assignment.details,
      dateDue: moment(assignment.dateDue).format('MMM D, YYYY')
    }
  })(withRouter(EditAssignmentFormComponent))

  return <EditAssignmentFormComponent
    assignment={ assignment }
    onSubmit={ onSubmit }
  />
}

export default EditAssignmentForm
