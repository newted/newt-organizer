import React, { Component } from 'react'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// API
import { updateCourse } from '../../actions/courses'
// Components
import EditCourseForm from './EditCourseForm'
// Styling
import styles from './EditCourse.module.css'

class EditCourse extends Component {
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
            info={ this.props.course }
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
