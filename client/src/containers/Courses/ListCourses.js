import React, { Component } from 'react'
import _ from 'lodash'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
// Components
import Button from '../../components/Button'
import Card from '../../components/Card'
// Styling
import styles from './ListCourses.module.css'
import { BookIcon } from '../../utils/icons'

class ListCourses extends Component {
  renderCards() {
    const { programId, courses } = this.props

    return _.map(courses, ({ _id, name }) => {
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
            <Button
              text='Add Course'
              additionalClass={ styles.addBtn }
            />
          </Link>
        </div>
        <div className={ styles.cardContainer }>
          { this.renderCards() }
        </div>
      </div>
    )
  }
}

function mapStateToProps({ programs }, { programId }) {
  const program = _.filter(
    programs.items,
    program => program._id === programId
  )[0]

  const courses = program.courses

  return {
    programId,
    courses
  }
}

export default connect(mapStateToProps)(ListCourses)
