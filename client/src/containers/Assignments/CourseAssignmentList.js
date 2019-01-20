import React from 'react'
import { Link } from 'react-router-dom'
// Components
import Button from '../../components/Button'
import Table from '../../components/Table'
// Styling
import styles from './CourseAssignmentList.module.css'

const CourseAssignmentList = ({ programId, courseId, assignments }) => {
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
      <Table />
    </div>
  )
}

export default CourseAssignmentList
