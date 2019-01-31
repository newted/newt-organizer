import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import Button from '../../components/Button'
import Card from '../../components/Card'
// Styling
import styles from './ProgramCourseList.module.css'
import { BookIcon } from '../../utils/icons'

class ProgramCourseList extends Component {
  static propTypes = {
    programId: PropTypes.string.isRequired,
    courses: PropTypes.array,
    dispatch: PropTypes.func
  }

  renderCards() {
    const { programId, programCourses } = this.props

    return _.map(programCourses, ({ _id, name }) => {
      return (
        <Card
          path={ `/programs/${programId}/courses/${_id}` }
          title={ name }
          icon={ BookIcon }
          additionalClass={ styles.cardColor }
          key={ _id }
        />
      )
    })
  }

  render() {
    const { programId } = this.props

    return (
      <div className={ styles.courseContainer }>
        <div className={ styles.headerContainer }>
          <h3>Courses</h3>
          <Link to={{ pathname: `/programs/${programId}/courses/add` }}>
            <Button additionalClass={ styles.addBtn }>
              Add Course
            </Button>
          </Link>
        </div>
        <div className={ styles.cardContainer }>
          { this.renderCards() }
        </div>
      </div>
    )
  }
}

function mapStateToProps({ programs, courses }, { programId }) {
  const program = programs.items[programId]
  const courseList = program
  ? program.courses
  : null

  const programCourses = {}

  if (courseList) {
    courseList.map(courseId => {
      if (courses.items[courseId]) {
        programCourses[courseId] = courses.items[courseId]
        return
      }
    })
  }

  return {
    programId,
    programCourses
  }
}

export default connect(mapStateToProps)(ProgramCourseList)
