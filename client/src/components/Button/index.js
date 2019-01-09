import React from 'react'
import styles from './Button.module.css'

const Button = ({ text, type, onClick, additionalClass }) => (
  <button
    type={ type }
    className={ `${styles.btn} ${additionalClass ? additionalClass : ''}` }
    onClick={ onClick }
  >
    { text }
  </button>
)

export default Button
