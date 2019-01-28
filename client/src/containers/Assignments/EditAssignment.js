import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// API
import { updateAssignment } from '../../actions/assignments'
// Components
import EditAssignmentForm from './EditAssignmentForm'
// Styling
import styles from './EditAssignment.module.css'

class EditAssignment extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    assignment: PropTypes.shape({
      programId: PropTypes.string,
      courseId: PropTypes.string,
      completed: PropTypes.bool,
      inProgress: PropTypes.bool,
      dateCreated: PropTypes.string,
      dateDue: PropTypes.string,
      name: PropTypes.string,
      _id: PropTypes.string
    }),
    updateAssignment: PropTypes.func.isRequired,
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

    console.log(this.props)

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
