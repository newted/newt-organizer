import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
// Styling
import styles from "./StatisticsTab.module.css";

class StatisticsTab extends Component {
  render() {
    return (
      <table className={styles.statsTable}>
        <tbody>
          {_.map(Object.keys(this.props.stats), statName => (
            <tr key={statName}>
              <td className={styles.stat}>{statName}</td>
              <td>{this.props.stats[statName]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps({ auth, programs, courses }) {
  const userSince = auth.item.dateCreated
    ? moment(auth.item.dateCreated).format("MMM DD, YYYY")
    : "N/A";
  const numPrograms = Object.keys(programs.items).length;
  const courseIds = Object.keys(courses.items);
  const numCourses = courseIds.length;

  let assignments = [];
  courseIds.forEach(courseId =>
    assignments.push(...courses.items[courseId].assignments)
  );
  const numAssignments = assignments.length;
  const numCompletedAssignments = assignments.filter(
    ({ completed }) => completed
  ).length;

  const percentAssignmentCompleted =
    Math.round((numCompletedAssignments / numAssignments) * 100) + "%";

  const stats = {
    "User Since": userSince,
    "Number of Programs": numPrograms,
    "Number of Courses": numCourses,
    "Number of Assignments": numAssignments,
    "% Assignments Completed": `${percentAssignmentCompleted} \u2014 (${numCompletedAssignments} out of ${numAssignments})`
  };

  return { stats };
}

export default connect(mapStateToProps)(StatisticsTab);
