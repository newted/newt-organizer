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

function mapStateToProps({ auth, courses }) {
  const userSince = auth.item.dateCreated
    ? moment(auth.item.dateCreated).format("MMM DD, YYYY")
    : "N/A";
  const numCourses = Object.keys(courses.items).length;
  let allContent = [];
  _.forEach(
    courses.items,
    ({ individualContent }) =>
      (allContent = [...allContent, ...individualContent])
  );
  const numContent = allContent.length;

  const stats = {
    "User Since": userSince,
    "Number of Courses": numCourses,
    "Individual Content": numContent
  };

  return { stats };
}

export default connect(mapStateToProps)(StatisticsTab);
