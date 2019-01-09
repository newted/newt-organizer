import React, { Component } from 'react'
import Button from '../Button'
import styles from './Modal.module.css'
import findByComponentType from '../../utils/findByComponentType'

const Header = () => null
const Body = () => null
const Footer = () => null

class Modal extends Component {
  showHideClassName() {
    const { showModal } = this.props

    return showModal
    ? [styles.modal, styles.displayBlock].join(' ')
    : [styles.modal, styles.displayNone].join(' ')
  }

  renderModalHeader() {
    const { children } = this.props
    const header = findByComponentType(children, Header)

    if (!header) {
      return null
    }

    return (
      <div className={ styles.modalHeader }>
        <h3>{ header.props.children }</h3>
      </div>
    )
  }

  renderModalBody() {
    const { children } = this.props
    const body = findByComponentType(children, Body)

    if (!body) {
      return null
    }

    return (
      <div className={ styles.modalBody }>
        <p>{ body.props.children }</p>
      </div>
    )
  }

  renderModalFooter() {
    const { children } = this.props
    const footer = findByComponentType(children, Footer)

    if (!footer) {
      return null
    }

    return (
      <div>
        { footer.props.children }
      </div>
    )
  }

  render() {
    const { handleClose } = this.props

    return (
      <div className={ this.showHideClassName() }>
        <div className={ styles.modalContent }>
          <div>
            { this.renderModalHeader() }
          </div>
          <div>
            { this.renderModalBody() }
          </div>
          <div className={ styles.modalFooter }>
            <Button
              text='Close'
              additionalClass={ styles.modalCloseBtn }
              onClick={ handleClose }
            />
            { this.renderModalFooter() }
          </div>
        </div>
      </div>
    )
  }
}

Modal.Header = Header
Modal.Body = Body
Modal.Footer = Footer

export default Modal
