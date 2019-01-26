import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// API
import { updateCourse } from '../../actions/courses'
// Components
import EditCourseForm from './EditCourseForm'
// Styling
import styles from './EditCourse.module.css'

class EditCourse extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    course: PropTypes.shape({
      announcements: PropTypes.array,
      assignments: PropTypes.array,
      dateCreated: PropTypes.string,
      name: PropTypes.string,
      quizzes: PropTypes.array,
      shortname: PropTypes.string,
      _id: PropTypes.string
    }),
    updateCourse: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  }

  render() {
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <div className={ styles.headerContainer }>
            <h3>Edit Course</h3>
          </div>
          <EditCourseForm
            course={ this.props.course }
            onSubmit={ this.props.updateCourse }
          />
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

  if (course) {
    course.programId = programId
  }

  return {
    auth,
    course
  }
}

export default connect(mapStateToProps, { updateCourse })(EditCourse)
