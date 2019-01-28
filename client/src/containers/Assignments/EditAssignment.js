import React, { Component } from 'react'
import _ from 'lodash'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// API
import { updateAssignment } from '../../actions/assignments'
// Components
import EditAssignmentForm from './EditAssignmentForm'
// Styling
import styles from './EditAssignment.module.css'

class EditAssignment extends Component {
  render() {
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    console.log(this.props.updateAssignment)

    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <div className={ styles.headerContainer }>
            <h3>Edit Assignment</h3>
          </div>
          <EditAssignmentForm
            assignment={ this.props.assignment }
            onSubmit={ this.props.updateAssignment }
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth, programs }, props) {
  const { programId, courseId, assignmentId } = props.match.params

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

  // This is getting ridiculous...
  const assignment = course
    ? _.filter(
        course.assignments,
        assignment => assignment._id === assignmentId
      )[0]
    : null

  if (assignment) {
    assignment.programId = programId
    assignment.courseId = courseId
  }

  return {
    auth,
    assignment
  }
}

export default connect(mapStateToProps, { updateAssignment })(EditAssignment)
