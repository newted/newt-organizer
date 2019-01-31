import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
// API
import { deleteCourse } from '../../actions/courses'
import { fetchPrograms }  from '../../actions/programs'
// Components
import Button from '../../components/Button'
import Modal from '../../components/Modal'
import CourseAssignmentList from '../Assignments/CourseAssignmentList'
// Styling
import styles from './CoursePage.module.css'

class CoursePage extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    programId: PropTypes.string.isRequired,
    course: PropTypes.shape({
      announcements: PropTypes.array,
      assignments: PropTypes.array,
      dateCreated: PropTypes.string,
      name: PropTypes.string,
      quizzes: PropTypes.array,
      shortname: PropTypes.string,
      _id: PropTypes.string
    }),
    deleteCourse: PropTypes.func.isRequired,
    fetchPrograms: PropTypes.func,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  }

  state = {
    showModal: false,
  }

  componentDidMount() {
    this.props.fetchPrograms()
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
          <CourseAssignmentList
            programId={ programId }
            courseId={ course._id }
            assignments={ course.assignments }
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth, courses }, props) {
  const { programId, courseId } = props.match.params

  const course = courses.items
    ? courses.items[courseId]
    : null

  return {
    auth,
    programId,
    course
  }
}

const mapDispatchToProps = {
  deleteCourse,
  fetchPrograms
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursePage)
