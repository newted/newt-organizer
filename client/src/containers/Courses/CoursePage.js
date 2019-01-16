import React, { Component } from 'react'
import _ from 'lodash'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
// API
import { deleteCourse } from '../../actions/courses'
// Components
import Button from '../../components/Button'
import Modal from '../../components/Modal'
// Styling
import styles from './CoursePage.module.css'

class CoursePage extends Component {
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
    const { programId, course, history, deleteCourse } = this.props
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    if (!course) {
      return <LoadingBar />
    }

    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <div className={ styles.headerContainer }>
            <h2>{ course.name }</h2>
            <div>
              <Link
                to={{ pathname: `/programs/${programId}/courses/${course._id}/edit` }}
              >
                <Button additionalClass={ styles.editBtn }>
                  Edit
                </Button>
              </Link>
              <Button
                additionalClass={ styles.deleteBtn }
                onClick={ this.openModal }
              >
                Delete
              </Button>
              <Modal
                showModal={ this.state.showModal }
                handleClose={ this.closeModal }
              >
                <Modal.Body>
                  Are you sure you want to delete this course?
                </Modal.Body>
                <Modal.Footer>
                  <Button
                    type='button'
                    additionalClass={ styles.deleteBtn }
                    onClick={
                      () => deleteCourse(programId, course._id, history)
                    }
                  >
                    Delete
                  </Button>
                </Modal.Footer>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth, programs }, props) {
  const { programId, courseId } = props.match.params

  const program = _.filter(
    programs.items,
    program => program._id === programId
  )[0]

  const course = program
    ? _.filter(
        program.courses,
        course => course._id === courseId
      )[0]
    : null

  return {
    auth,
    programId,
    course
  }
}

export default connect(mapStateToProps, { deleteCourse })(CoursePage)
