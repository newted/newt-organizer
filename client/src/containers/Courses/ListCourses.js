import React, { Component } from 'react'
import Button from '../../components/Button'
import styles from './ListCourses.module.css'

class ListCourses extends Component {
  render() {
    return (
      <div className={ styles.courseContainer }>
        <div className={ styles.headerContainer }>
          <h3>Courses</h3>
          <Button
            text='Add Course'
            additionalClass={ styles.addBtn }
          />
        </div>
      </div>
    )
  }
}

export default ListCourses
