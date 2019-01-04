import React from 'react'
import styles from './ProgramField.module.css'

export default ({ input, label, required, meta: { error, touched } }) => {
  return (
    <div className={ styles.inputGroup }>
      <div>
        <label className={ styles.label }>{ label }</label>
        <span className={ styles.tag }>{ !required && 'Optional' }</span>
      </div>
      <input {...input} className={ styles.input }/>
      <small className={ styles.error }>{ touched && error }</small>
    </div>
  )
}