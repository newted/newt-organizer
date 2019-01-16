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

  class EditProgramFormClass extends Component {
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
      const { handleSubmit, onSubmit, info, history } = this.props

      if (!info) {
        return <LoadingBar />
      }

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

  EditProgramFormClass = reduxForm({
    form: 'editProgramForm',
    initialValues: {
      name: info.name,
      shortname: info.shortname,
      institution: info.institution
    }
  })(withRouter(EditProgramFormClass))

  return <EditProgramFormClass info={ info } onSubmit={ onSubmit } />
}

export default EditProgramForm
