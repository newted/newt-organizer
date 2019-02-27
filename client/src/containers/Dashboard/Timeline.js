import React, { Component, Fragment } from 'react'
import _ from 'lodash'
import moment from 'moment'
import { connect } from 'react-redux'
// API
import { completeAssignment } from '../../actions/assignments'
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
    const { upcomingAssignments, completeAssignment } = this.props

    return _.map(upcomingAssignments, assignment => (
      <Fragment key={ assignment._id }>
        { this.renderDate(assignment.dateDue) }
        <TimelineCard
          assignment={ assignment }
          completeAssignment={ completeAssignment }
          key={ assignment._id }
        />
      </Fragment>
    ))
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
      assignment['courseName'] = course.name
      assignment['courseId'] = course._id
      assignment['programId'] = course.programId

      // Difference in week number between current week and week number that
      // the assignment due date is in. 0 means it's the same week of year.
      // Positive number means it's the weeks before, and negative number means
      // it's the weeks after.
      const weekDiff = moment().week() - moment(assignment.dateDue).week()

      // Add assignment to upcoming list only if it is in the same week of year
      // or one week ahead than the current week (within the next two weeks),
      // with week of year being number of weeks since Jan 1st.
      if (weekDiff === 0 || weekDiff === -1) {
        upcomingAssignments.push(assignment)
      }

      // Add assignment to previous week list if it is a lower week number than
      // the current week (i.e. the week has passed).
      // In the future I'll group them by weeks.
      if (weekDiff > 0) {
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

export default connect(mapStateToProps, { completeAssignment })(Timeline)
