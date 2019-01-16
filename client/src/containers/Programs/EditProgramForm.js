import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm, Form, Field as ReduxField } from 'redux-form'
import { withRouter } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
import programFields from './programFields'
// Components
import Button from '../../components/Button'
import Field from '../../components/Field'
// Styling
import styles from './EditProgramForm.module.css'

const EditProgramForm = ({ info, onSubmit }) => {
  if (!info) {
    return <LoadingBar />
  }

  class EditProgramFormComponent extends Component {
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
        <div className={ styles.formContainer }>
          <Form
            onSubmit={ handleSubmit(values =>
              onSubmit(info._id, values, history)
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

  EditProgramFormComponent = reduxForm({
    form: 'editProgramForm',
    initialValues: {
      name: info.name,
      shortname: info.shortname,
      institution: info.institution
    }
  })(withRouter(EditProgramFormComponent))

  return <EditProgramFormComponent info={ info } onSubmit={ onSubmit } />
}

export default EditProgramForm
