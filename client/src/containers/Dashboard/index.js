import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
// Styling
import styles from './Dashboard.module.css'

class Dashboard extends Component {
  state = {
    showModal: false
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  render() {
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    return (
      <div className={ styles.appContainer }>
        <Sidebar />
        <section className={ styles.pageContainer }>
          <Navbar />
          <div className={ styles.mainContainer }>
            <div className={ styles.contentContainer }>
              <h2 className={ styles.header }>Dashboard</h2>
            </div>
            <Modal
              showModal={ this.state.showModal }
              handleClose={ this.closeModal }
            >
              <Modal.Header>
                Modal Header
              </Modal.Header>
              <Modal.Body>
                Modal Body
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type='button'
                  text='Save Changes'
                />
              </Modal.Footer>
            </Modal>
            <Button
              type='button'
              text={ 'Open Modal' }
              onClick={ this.openModal }
            />
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps({ auth }) {
  return { auth }
}

export default connect(mapStateToProps)(Dashboard)
