import React from 'react'
import styles from './Button.module.css'

const Button = ({ text, type, additionalClass }) => (
  <button
    type={ type }
    className={ `${styles.btn} ${additionalClass ? additionalClass : ''}` }
  >
    { text }
  </button>
)

export default Button
