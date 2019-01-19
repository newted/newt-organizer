import React from 'react'
import DatePicker from 'react-datepicker'
// Styling
import styles from './DateField.module.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

const DateField = ({ input, label, required, meta: { error, touched } }) => {
  console.log(input.value)
  return (
    <div className={ styles.inputGroup }>
      <div>
        <label className={ styles.label }>{ label }</label>
        <span className={ styles.tag }>{ !required && 'Optional' }</span>
      </div>
      <DatePicker
        dateFormat='DD/MM/YYYY'
        selected={ input.value || null }
        onChange={ input.onChange }
        className={ styles.input }
      />
      <small className={ styles.error }>{ touched && error }</small>
    </div>
  )
}

export default DateField
