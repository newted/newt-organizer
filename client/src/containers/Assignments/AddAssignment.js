import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
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

export default connect(mapStateToProps)(AddAssignment)
