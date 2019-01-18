import React from 'react'
import { Link } from 'react-router-dom'
import Button from '../../components/Button'
// Styling
import styles from './CourseAssignmentList.module.css'

const CourseAssignmentList = ({ programId, courseId }) => {
  return (
    <div className={ styles.assignmentsContainer }>
      <div className={ styles.headerContainer }>
        <h3 className={ styles.header }>Assignments</h3>
        <Link
          to={{ pathname: `/programs/${programId}/courses/${courseId}/assignments/add` }}
        >
          <Button additionalClass={ styles.addBtn }>
            Add Assignment
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default CourseAssignmentList
