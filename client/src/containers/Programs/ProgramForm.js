import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm, Field } from 'redux-form'
import ProgramField from './ProgramField'

const FIELDS = [
  { label: 'Program Name', name: 'name' },
  { label: 'Short Name', name: 'shortname' },
  { label: 'Institution', name: 'institution' }
]

class ProgramForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name}) => {
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
          <button type='submit'>Submit</button>
        </form>
      </div>
    )
  }
}

export default reduxForm({
  form: 'programForm'
})(ProgramForm)
