import React, { Component } from 'react'
import styles from './CourseList.module.css'

class CourseList extends Component {
  render() {
    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <div className={ styles.headerContainer }>
            <h2>Your Courses</h2>
          </div>
        </div>
      </div>
    )
  }
}

export default CourseList
