import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import ProgramField from './ProgramField'

class ProgramForm extends Component {
  renderFields() {
    return (
      <div>
        <Field type='text' name='name' component={ ProgramField } />
      </div>
    )
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
