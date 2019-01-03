import React from 'react'
import styles from './Button.module.css'

const Button = ({ text, additionalClass }) => (
  <button className={ `${styles.btn} ${additionalClass}` }>
    { text }
  </button>
)

export default Button
