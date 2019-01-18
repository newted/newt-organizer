import React from 'react'
import Button from '../../components/Button'
// Styling
import styles from './CourseAssignmentList.module.css'

const CourseAssignmentList = () => {
  return (
    <div className={ styles.assignmentsContainer }>
      <div className={ styles.headerContainer }>
        <h3 className={ styles.header }>Assignments</h3>
        <Button additionalClass={ styles.addBtn }>
          Add Assignment
        </Button>
      </div>
    </div>
  )
}

export default CourseAssignmentList
