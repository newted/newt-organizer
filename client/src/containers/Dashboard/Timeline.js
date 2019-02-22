import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
// Components
import TimelineCard from './TimelineCard'
// Styling
import styles from './Timeline.module.css'

class Timeline extends Component {
  renderCards() {
    const { assignments } = this.props

    return _.map(assignments, ({ _id, name, courseName, details }) => (
      <TimelineCard
        title={ name }
        course={ courseName }
        details={ details }
        key={ _id }
      />
    ))
  }
  render() {
    return (
      <div className={ styles.container }>
        <div className={ styles.agendaContainer }>
          <h3 className={ styles.header }>Your Upcoming Week</h3>
          <div className={ styles.timeline }>
            <h4 className={ styles.date }>22 Feb 2019</h4>
            { this.renderCards() }
          </div>
        </div>
        <div className={ styles.prevWeekContainer }>
          <h3 className={ styles.header }>Previous Week</h3>
          <div className={ styles.prevWeek }>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ courses, programs }) {
  const assignments = []

  _.forEach(courses.items, course => {
    _.forEach(course.assignments, assignment => {
      assignment['courseName'] = courses.items[course._id].name
      assignments.push(assignment)
    })
  })

  return {
    assignments
  }
}

export default connect(mapStateToProps)(Timeline)
