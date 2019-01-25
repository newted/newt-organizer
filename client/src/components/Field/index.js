import React from 'react'
// Styling
import styles from './Field.module.css'

export default ({ input, label, required, meta: { error, touched } }) => {
  return (
    <div className={ styles.inputGroup }>
      <div>
        <label className={ styles.label }>{ label }</label>
        { !required && <span className={ styles.tag }>Optional</span> }
      </div>
      <input { ...input } className={ styles.input }/>
      { touched && error && (
          <small className={ styles.error }>{ error }</small>
        )
      }
    </div>
  )
}
