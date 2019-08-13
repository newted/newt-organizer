import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
// Components
import Loader from "../../components/Loader";
// API
import { getKnowledgeMaps } from "../../actions/knowledgeMap";
// Styling
import styles from "./LearningMap.module.css";

class LearningMap extends Component {
  componentDidUpdate() {
    const {
      isFetching,
      learningMap,
      knowledgeMap,
      getKnowledgeMaps
    } = this.props;

    // If the learning map exists and the knowledge map doesn't and neither of
    // them are being fetched, request to get the knowledge maps
    if (!isFetching && !_.isEmpty(learningMap) && _.isEmpty(knowledgeMap)) {
      getKnowledgeMaps(learningMap.knowledgeMap);
    }
  }

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
  const isFetching = learningMap.isFetching || knowledgeMap.isFetching;

  return {
    isFetching,
    learningMap: learningMap.items,
    knowledgeMap: knowledgeMap.items
  };
}

const mapDispatchToProps = { getKnowledgeMaps };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearningMap);
