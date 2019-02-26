import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
// Components
import TimelineCard from './TimelineCard'
// Styling
import styles from './Timeline.module.css'

class Timeline extends Component {
  // Variable to keep the last date used. When displaying the Timeline cards,
  // if two assignments are to be done/due on the same date, then it doesn't
  // make sense to render the same date twice. Instead, both assignments should
  // be under the one date heading. This constant allows for that date check.
  currentDate = ''

  // Display (or don't display) the due/to-do date
  renderDate = (date) => {
    if (date !== this.currentDate) {
      // Update the current date
      this.currentDate = date
      return (
        <h4 className={ styles.date }>
          { moment(date).format('MMM DD') }
        </h4>
      )
    }
  }

  renderUpcomingAssignments() {
    const { upcomingAssignments } = this.props

    return _.map(
      upcomingAssignments,
      ({ _id, name, courseName, details, dateDue, courseId, programId }) => (
        <Fragment key={_id}>
          {this.renderDate(dateDue)}
          <TimelineCard
            title={name}
            course={courseName}
            details={details}
            programId={programId}
            courseId={courseId}
            key={_id}
          />
        </Fragment>
      )
    )
  }

  render() {
    return (
      <div className={ styles.container }>
        <div className={ styles.agendaContainer }>
          <h3 className={ styles.header }>Your Upcoming Schedule</h3>
          <div className={ styles.timeline }>
            { this.renderUpcomingAssignments() }
          </div>
        </div>
        <div className={ styles.prevWeekContainer }>
          <h3 className={ styles.header }>Previous Weeks</h3>
          <div className={ styles.prevWeek }>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ courses, programs }) {
  const upcomingAssignments = []
  const prevAssignments = []

  _.forEach(courses.items, course => {
    _.forEach(course.assignments, assignment => {
      const today = Date.now()

      assignment['courseName'] = course.name
      assignment['courseId'] = course._id
      assignment['programId'] = course.programId
      // Add assignment to upcoming list only if the due date is after
      // today's date.
      if (new Date(assignment.dateDue) > today) {
        upcomingAssignments.push(assignment)
      }

      // Add assignment to previous week list if the difference between today's
      // date and the due date is 1 (it's a simplified version. In the future
      // I'll group them by weeks (> 1 && < 7, > 7 && < 14, etc.)).
      if (moment().diff(assignment.dateDue, 'days') >= 1) {
        prevAssignments.push(assignment)
      }
    })
  })

  // Sort by due date
  upcomingAssignments.sort((a, b) => new Date(a.dateDue) - new Date(b.dateDue))

  return {
    upcomingAssignments,
    prevAssignments
  }
}

export default connect(mapStateToProps)(Timeline)
