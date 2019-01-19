import React from 'react'
import DatePicker from 'react-datepicker'
// Styling
import styles from './DateField.module.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

const DateField = ({ input, label, required, meta: { error, touched } }) => {
  return (
    <div className={ styles.inputGroup }>
      <div>
        <label className={ styles.label }>{ label }</label>
        { !required && <span className={ styles.tag }>Optional</span> }
      </div>
      <div className={ styles.dateContainer }>
        <DatePicker
          dateFormat='MMM d, yyyy'
          selected={ input.value || null }
          placeholderText='Select date'
          onChange={ input.onChange }
          onFocus={ input.onFocus }   // Didn't pass these as {...input} because
          onBlur={ input.onBlur }     // value field throws a type error
          onDrop={ input.onDrop }
          onDragStart={ input.onDragStart }
          className={ styles.input }
        />
        { touched && error && (
            <small className={ styles.error }>{ error }</small>
          )
        }
      </div>
    </div>
  )
}

export default DateField
