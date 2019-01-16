import React from 'react'
import styles from './Button.module.css'

const Button = ({ type, onClick, additionalClass, children }) => (
  <button
    type={ type }
    className={ `${styles.btn} ${additionalClass ? additionalClass : ''}` }
    onClick={ onClick }
  >
    { children }
  </button>
)

export default Button
