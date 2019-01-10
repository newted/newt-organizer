import React, { Component } from 'react'
import _ from 'lodash'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
// API
import { deleteProgram }  from '../../actions/programs'
// Components
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import ListCourses from '../Courses/ListCourses'
// Styling
import styles from './ProgramPage.module.css'

class ProgramPage extends Component {
  state = {
    showModal: false
  }

  openModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  renderContent() {
    const { program, history, deleteProgram } = this.props

    return (
      <div className={ styles.contentContainer }>
        <div className={ styles.headerContainer }>
          <div className={ styles.headings }>
            <h2 className={ styles.header }>
              { this.props.program.name }
            </h2>
            <h2 className={ styles.institution }>
              { this.props.program.institution }
            </h2>
          </div>
          <div>
            <Link to={{ pathname: `/programs/${this.props.program._id}/edit` }}>
              <Button
                text='Edit'
                additionalClass={ styles.editBtn }
              />
            </Link>
            <Button
              text='Delete'
              additionalClass={ styles.deleteBtn }
              onClick={ this.openModal }
            />
            <Modal
              showModal={ this.state.showModal }
              handleClose={ this.closeModal }
            >
              <Modal.Body>
                Are you sure you want to delete this program?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  type='button'
                  text='Delete'
                  additionalClass={ styles.deleteBtn }
                  onClick={ () => deleteProgram(program._id, history) }
                />
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <ListCourses programId={ program._id }/>
      </div>
    )
  }

  render() {
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    if (!this.props.program) {
      return <LoadingBar />
    }

    return (
      <div className={ styles.appContainer }>
        <Sidebar />
        <section className={ styles.pageContainer }>
          <Navbar />
          <div className={ styles.mainContainer }>
            { this.renderContent() }
          </div>
        </section>
      </div>
    )
  }
}

function mapStateToProps({ auth, programs }, props) {
  const { programId } = props.match.params
  const program = _.filter(
    programs.items,
    program => program._id === programId
  )[0]

  return {
    auth,
    program
  }
}

export default connect(mapStateToProps, { deleteProgram })(ProgramPage)
