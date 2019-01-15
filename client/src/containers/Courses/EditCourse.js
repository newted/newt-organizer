import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
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
          <EditCourseForm />
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth, programs }, props) {
  return { auth }
}

export default connect(mapStateToProps)(EditCourse)
