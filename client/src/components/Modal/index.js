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

  renderModalBody() {
    const { children } = this.props
    const body = findByComponentType(children, Body)

    if (!body) {
      return null
    }

    return (
      <div> { body.props.children }</div>
    )
  }

  renderModalFooter() {
    const { children } = this.props
    const footer = findByComponentType(children, Footer)

    if (!footer) {
      return null
    }

    return (
      <div>{ footer.props.children }</div>
    )
  }

  render() {
    const { handleClose } = this.props

    return (
      <div className={ this.showHideClassName() }>
        <div className={ styles.modalMain }>
          <div>
            { this.renderModalHeader() }
          </div>
          <div>
            { this.renderModalBody() }
          </div>
          <div>
            { this.renderModalFooter() }
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
Modal.Body = Body
Modal.Footer = Footer

export default Modal
