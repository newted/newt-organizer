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
        <span className={ styles.tag }>{ !required && 'Optional' }</span>
      </div>
      <div className={ styles.dateContainer }>
        <DatePicker
          dateFormat='MMM d, yyyy'
          selected={ input.value || null }
          onChange={ input.onChange }
          onFocus={ input.onFocus }
          onBlur={ input.onBlur }
          onDrop={ input.onDrop }
          onDragStart={ input.onDragStart }
          className={ styles.input }
        />
        <small className={ styles.error }>{ touched && error }</small>
      </div>
    </div>
  )
}

export default DateField
