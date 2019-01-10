import React from 'react'
import styles from './Field.module.css'

export default ({ input, placeholder, label, required, meta: { error, touched } }) => {
  return (
    <div className={ styles.inputGroup }>
      <div>
        <label className={ styles.label }>{ label }</label>
        <span className={ styles.tag }>{ !required && 'Optional' }</span>
      </div>
      <input {...input} placeholder={ placeholder } className={ styles.input }/>
      <small className={ styles.error }>{ touched && error }</small>
    </div>
  )
}
