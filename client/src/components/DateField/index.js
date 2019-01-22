import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
// Styling
import styles from './DateField.module.css'
import 'react-datepicker/dist/react-datepicker-cssmodules.css'

class DateField extends Component {
  // So Redux form *sometimes* passes input.value as a string and
  // sometimes as an object. Datepicker crashes it its selected prop is given
  // a string, only works if it's a Date object. So this function ensures
  // that the selected prop is passed a Date object.
  sanitizeDate = (date) => {
    // Default value is empty string
    if (typeof date === 'string' && date.length > 0) {
      const newDate = new Date(date)
      return newDate
    }

    return date
  }

  render() {
    const { input, label, required, meta: { error, touched } } = this.props

    return (
      <div className={ styles.inputGroup }>
        <div>
          <label className={ styles.label }>{ label }</label>
          { !required && <span className={ styles.tag }>Optional</span> }
        </div>
        <div className={ styles.dateContainer }>
          <DatePicker
            dateFormat='MMM d, yyyy'
            selected={ this.sanitizeDate(input.value) || null }
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
}

export default DateField
