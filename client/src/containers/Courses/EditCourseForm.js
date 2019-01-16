import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm, Form, Field as ReduxField } from 'redux-form'
import { withRouter } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import courseFields from './courseFields'
// Components
import Button from '../../components/Button'
import Field from '../../components/Field'
// Styling
import styles from './EditCourseForm.module.css'


const EditCourseForm = ({ info, onSubmit }) => {
  if (!info) {
    return <LoadingBar />
  }

  class EditCourseFormComponent extends Component {
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
      const { handleSubmit, onSubmit, history } = this.props

      return (
        <div className={ styles.formContainer }>
          <Form
            onSubmit={ handleSubmit(values =>
              onSubmit(info.programId, info._id, values, history)
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

  EditCourseFormComponent = reduxForm({
    form: 'editCourseForm',
    initialValues: {
      name: info.name,
      shortname: info.shortname
    }
  })(withRouter(EditCourseFormComponent))

  return <EditCourseFormComponent info={ info } onSubmit={ onSubmit }/>
}

export default EditCourseForm
