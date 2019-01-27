import React, { Component } from 'react'
import styles from './EditAssignment.module.css'

class EditAssignment extends Component {
  render() {
    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <div className={ styles.headerContainer }>
            <h3>Edit Assignment</h3>
          </div>
        </div>
      </div>
    )
  }
}

export default EditAssignment
