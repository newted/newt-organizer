import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import AddCourseForm from './AddCourseForm'
// API
import { submitCourse } from '../../actions/courses'
// Styling
import styles from './AddCourse.module.css'

class AddCourse extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    programId: PropTypes.string.isRequired,
    submitCourse: PropTypes.func.isRequired,
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
            <h3>Add a New Course</h3>
          </div>
          <AddCourseForm
            programId={ this.props.programId }
            onSubmit={ this.props.submitCourse }
          />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth }, props) {
  const { programId } = props.match.params

  return {
    auth,
    programId
  }
}

export default connect(mapStateToProps, { submitCourse })(AddCourse)
