import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import AddAssignmentForm from './AddAssignmentForm'
// API
import { submitAssignment } from '../../actions/assignments'
// Styling
import styles from './AddAssignment.module.css'

class AddAssignment extends Component {
  render() {
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <div className={ styles.headerContainer }>
            <h3>Add a New Assignment</h3>
          </div>
          <AddAssignmentForm
            programId={ this.props.programId }
            courseId={ this.props.courseId }
            onSubmit={ this.props.submitAssignment} />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }, props) {
  const { programId, courseId } = props.match.params

  return {
    auth,
    programId,
    courseId
  }
}

export default connect(mapStateToProps, { submitAssignment })(AddAssignment)
