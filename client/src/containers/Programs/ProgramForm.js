import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

class ProgramForm extends Component {
  render() {
    return (
      <div>
        Program Form
      </div>
    )
  }
}

export default reduxForm({
  form: 'ProgramForm'
})(ProgramForm)
