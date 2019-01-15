import React, { Component } from 'react'
import _ from 'lodash'
import { reduxForm, Form, Field as ReduxField } from 'redux-form'
import courseFields from './courseFields'
// Components
import Button from '../../components/Button'
import Field from '../../components/Field'
// Styling
import styles from './EditCourseForm.module.css'


class EditCourseForm extends Component {
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
    const { handleSubmit } = this.props
    
    return (
      <div>
        <Form
          onSubmit={ handleSubmit(values => console.log(values)) }
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
  form: 'editCourseForm'
})(EditCourseForm)
