import React, { Component } from 'react'
import Button from '../Button'
import styles from './Modal.module.css'
import findByComponentType from '../../utils/findByComponentType'

const Header = () => null

class Modal extends Component {
  showHideClassName() {
    const { showModal } = this.props

    return showModal
    ? `${ styles.modal } ${ styles.displayBlock }`
    : `${ styles.modal } ${ styles.displayNone }`
  }

  renderModalHeader() {
    const { children } = this.props

    const header = findByComponentType(children, Header)

    if (!header) {
      return null
    }

    return (
      <h2>{ header.props.children }</h2>
    )
  }

  render() {
    const { handleClose, showModal } = this.props

    return (
      <div className={ this.showHideClassName() }>
        <div className={ styles.modalMain }>
          <div>
            { this.renderModalHeader() }
          </div>
          <Button
            text='Close'
            onClick={ handleClose }
          />
        </div>
      </div>
    )
  }
}

Modal.Header = Header

export default Modal
