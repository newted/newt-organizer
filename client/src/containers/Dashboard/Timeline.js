import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import _ from "lodash";
import moment from "moment";
import { connect } from "react-redux";
import { initializePrevAssignments } from "../../utils/containerHelpers";
// API
import { completeAssignment } from "../../actions/assignments";
import { fetchAllCourses } from "../../actions/courses";
// Components
import TimelineCard from "./TimelineCard";
import PrevWeekCard from "./PrevWeekCard";
// Styling
import styles from "./Timeline.module.css";

class Timeline extends Component {
  static propTypes = {
    upcomingAssignments: PropTypes.arrayOf(PropTypes.object),
    prevAssignments: PropTypes.arrayOf(
      PropTypes.shape({
        startDate: PropTypes.string,
        endDate: PropTypes.string,
        assignments: PropTypes.arrayOf(PropTypes.object)
      })
    )
  };

  componentDidMount() {
    this.props.fetchAllCourses(Object.keys(this.props.programs.items));
  }

  // Variable to keep the last date used. When displaying the Timeline cards,
  // if two assignments are to be done/due on the same date, then it doesn't
  // make sense to render the same date twice. Instead, both assignments should
  // be under the one date heading. This constant allows for that date check.
  currentDate = "";

  // Display (or don't display) the due/to-do date
  renderDate = date => {
    if (date !== this.currentDate) {
      // Update the current date
      this.currentDate = date;
      return <h4 className={styles.date}>{moment(date).format("MMM DD")}</h4>;
    }
  };

  renderUpcomingAssignments() {
    const { upcomingAssignments, completeAssignment } = this.props;

    if (upcomingAssignments.length > 0) {
      return _.map(upcomingAssignments, assignment => (
        <Fragment key={assignment._id}>
          {this.renderDate(assignment.dateDue)}
          <TimelineCard
            assignment={assignment}
            completeAssignment={completeAssignment}
            key={assignment._id}
          />
        </Fragment>
      ));
    } else {
      // If there are no assignments, return no content message
      return (
        <div className={styles.date}>
          Set up assignments to see your Timeline here.
        </div>
      );
    }
  }

  renderPrevAssignments() {
    const { prevAssignments } = this.props;

    // If all 3 weeks have no assignments, display No Data message.
    if (
      prevAssignments[0].assignments.length === 0 &&
      prevAssignments[1].assignments.length === 0 &&
      prevAssignments[2].assignments.length === 0
    ) {
      return (
        <div className={styles.date}>
          No assignment data available for previous weeks.
        </div>
      );
    }

    // Get number of assignments completed and percent completed for each
    // week
    return _.map(prevAssignments, (weekGroup, index) => {
      // Initialize variables
      const total = weekGroup.assignments.length;
      let numCompleted = 0;
      let percentCompleted = "";

      if (total > 0) {
        // For each assignment, if it has been completed, increment the number
        // completed by 1
        _.forEach(weekGroup.assignments, ({ completed }) => {
          if (completed) {
            numCompleted += 1;
          }
        });

        // Calculate the percentage completed
        percentCompleted = Math.round((numCompleted / total) * 100) + "%";

        // Only returns a Card if the total number of assignments are greater
        // than 0. This 3 weeks are initialized previously, this is so that
        // a card isn't displayed if, for example, a user never created
        // assignments for that week. A downside is that if a user doesn't
        // create assignments in a given week in the middle of 2
        // assignment-filled weeks, the week card won't show, instead of showing
        // 0 / 0 completed. But that's for another day.
        return (
          <Fragment key={`week ${index + 1}`}>
            <h4 className={styles.date}>
              {weekGroup.startDate} &ndash; {weekGroup.endDate}
            </h4>
            <PrevWeekCard
              key={`week ${index + 1}`}
              numCompleted={numCompleted}
              total={total}
              percentCompleted={percentCompleted || "-"}
            />
          </Fragment>
        );
      }
    });
  }

  render() {
    return (
      <div className={styles.container}>
        <div className={styles.agendaContainer}>
          <h3 className={styles.header}>Your Upcoming Schedule</h3>
          <div className={styles.timeline}>
            {this.renderUpcomingAssignments()}
          </div>
        </div>
        <div className={styles.prevWeekContainer}>
          <h3 className={styles.header}>Previous Weeks</h3>
          <div className={styles.timeline}>{this.renderPrevAssignments()}</div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ courses, programs }) {
  const upcomingAssignments = [];
  // Initialize as an array of 3 objects with each object representing one
  // week, so 3 weeks in total. Each object has a startDate, endDate, and
  // assignments field. Each object contains the information for the previous
  // week, 2 weeks ago, and 3 weeks ago in that order.
  const prevAssignments = initializePrevAssignments();

  _.forEach(courses.items, course => {
    _.forEach(course.assignments, assignment => {
      assignment["courseName"] = course.name;
      assignment["courseId"] = course._id;
      assignment["programId"] = course.programId;

      // Difference in week number between current week and week number that
      // the assignment due date is in. 0 means it's the same week of year.
      // Positive number means it's the weeks before, and negative number means
      // it's the weeks after.
      const weekDiff = moment().week() - moment(assignment.dateDue).week();

      // Add assignment to upcoming list only if it is in the same week of year
      // or one week ahead than the current week (within the next two weeks),
      // with week of year being number of weeks since Jan 1st.
      if (weekDiff === 0 || weekDiff === -1) {
        upcomingAssignments.push(assignment);
      }

      // Add assignment to previous week list if it is a lower week number than
      // the current week.
      if (weekDiff > 0 && weekDiff <= 3) {
        // Push assignment in descending order (most recent week
        // comes first). This is done by the index being 1 less than the week
        // difference. So if week diff is 1 (one week earlier), put the
        // assignment in the 0th index array.
        prevAssignments[weekDiff - 1].assignments.push(assignment);
      }
    });
  });

  // Sort by due date
  upcomingAssignments.sort((a, b) => new Date(a.dateDue) - new Date(b.dateDue));

  return {
    programs,
    upcomingAssignments,
    prevAssignments
  };
}

const mapDispatchToProps = {
  completeAssignment,
  fetchAllCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Timeline);
