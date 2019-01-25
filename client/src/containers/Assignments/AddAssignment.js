import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import AddAssignmentForm from './AddAssignmentForm'
// API
import { submitAssignment } from '../../actions/assignments'
// Styling
import styles from './AddAssignment.module.css'

class AddAssignment extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    programId: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    submitAssignment: PropTypes.func.isRequired,
    // Connect stuff
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
