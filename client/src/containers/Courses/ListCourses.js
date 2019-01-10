import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import Button from '../../components/Button'
import styles from './ListCourses.module.css'

class ListCourses extends Component {
  render() {
    const { programId } = this.props

    return (
      <div className={ styles.courseContainer }>
        <div className={ styles.headerContainer }>
          <h3>Courses</h3>
          <Link to={{ pathname: `/programs/${programId}/courses/add` }}>
            <Button
              text='Add Course'
              additionalClass={ styles.addBtn }
            />
          </Link>
        </div>
      </div>
    )
  }
}

function mapStateToProps(_, { programId }) {
  return {
    programId
  }
}

export default connect(mapStateToProps)(ListCourses)
