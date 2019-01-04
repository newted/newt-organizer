import React from 'react'
import styles from './ProgramField.module.css'

export default ({ input, label }) => {
  return (
    <div className={ styles.inputGroup }>
      <label>{ label }</label>
      <input {...input} className={ styles.input }/>
    </div>
  )
}
