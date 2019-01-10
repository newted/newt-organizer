import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm, Form, Field as ReduxField } from 'redux-form'
import { withRouter } from 'react-router-dom'
import LoadingBar from 'react-redux-loading'
// Components
import Button from '../../components/Button'
import Field from '../../components/Field'
// Styling
import styles from './EditProgramForm.module.css'

const FIELDS = [
  { label: 'Program Name', name: 'name', required: true },
  { label: 'Short Name', name: 'shortname', required: false },
  { label: 'Institution', name: 'institution', required: true }
]

class EditProgramForm extends Component {
  renderFields() {
    const { info } = this.props

    return _.map(FIELDS, ({ label, name, required }) => {
      return <ReduxField
        component={ Field }
        type='text'
        label={ label }
        name={ name }
        placeholder={ info[name] }
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
      <div>
        <Form
          onSubmit={ handleSubmit(values =>
            onSubmit(info._id, values, history)
          ) }
        >
          { this.renderFields() }
          <Button
            text='Update'
            type='submit'
            additionalClass={ styles.updateBtn }
          />
        </Form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'editProgramForm'
})(withRouter((EditProgramForm)))
