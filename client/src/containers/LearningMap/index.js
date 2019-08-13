import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
// Components
import Loader from "../../components/Loader";
// Styling
import styles from "./LearningMap.module.css";

class LearningMap extends Component {
  renderNoContent() {
    return (
      <div className={styles.message}>
        Your Learning Map tracks and presents the knowledge you have acquired.
        In order to view your Learning Map, you must complete an assignment that
        has Knowledge Tracking.
        <br />
        <br />
        For a demo, add and complete this{" "}
        <a
          href="https://www.youtube.com/watch?v=O5nskjZ_GoI"
          className={styles.link}
        >
          Crash Course Computer Science
        </a>{" "}
        video as an assignment.
      </div>
    );
  }

  render() {
    const { isFetching, knowledgeMap } = this.props;

    if (isFetching) {
      return <Loader />;
    }

    return (
      <div className={styles.mainContainer}>
        <h2 className={styles.headerContainer}>Learning Map</h2>
        {_.isEmpty(knowledgeMap) && this.renderNoContent()}
      </div>
    );
  }
}

function mapStateToProps({ learningMap, knowledgeMap }) {
  return {
    isFetching: learningMap.isFetching,
    learningMap: learningMap.items,
    knowledgeMap: knowledgeMap.items
  };
}

export default connect(mapStateToProps)(LearningMap);
