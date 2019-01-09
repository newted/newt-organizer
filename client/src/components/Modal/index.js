import React from 'react'
import styles from './Modal.module.css'

const Modal = ({ handleClose, showModal, children }) => {
  const showHideClassName = showModal
    ? `${ styles.modal } ${ styles.displayBlock }`
    : `${ styles.modal } ${ styles.displayNone }`

  return (
    <div className={ showHideClassName }>
      <div className={ styles.modalMain }>
        { children }
        <button onClick={ handleClose }>Close</button>
      </div>
    </div>
  )
}

export default Modal
