import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
// Components
import Loader from "../../components/Loader";
import Categories from "./Categories";
import Content from "./LearningMapContent";
// API
import { getKnowledgeMaps } from "../../actions/knowledgeMap";
// Styling
import styles from "./LearningMap.module.css";

class LearningMap extends Component {
  state = {
    currentSubject: "",
    currentModule: ""
  };

  componentDidMount() {
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

    // Set the current subject and module to the first one in the knowledge map
    // object if the object exists and there's no other subject or module set
    if (
      !_.isEmpty(knowledgeMap) &&
      !this.state.currentSubject &&
      !this.state.currentModule
    ) {
      const firstSubject = Object.keys(knowledgeMap)[0];
      const firstModule = Object.keys(knowledgeMap[firstSubject])[0];

      this.setState(() => ({
        currentSubject: firstSubject,
        currentModule: firstModule
      }));
    }
  }

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

    // Set the current subject and module to the first one in the knowledge map
    // object if the object exists and there's no other subject or module set
    if (
      !_.isEmpty(knowledgeMap) &&
      !this.state.currentSubject &&
      !this.state.currentModule
    ) {
      const firstSubject = Object.keys(knowledgeMap)[0];
      const firstModule = Object.keys(knowledgeMap[firstSubject])[0];

      this.setState(() => ({
        currentSubject: firstSubject,
        currentModule: firstModule
      }));
    }
  }

  // Handler to pass to Categories component so when a particular module is
  // clicked, the module name and subject name is sent back so that it can be
  // used to get the necessary info to display in the Content component
  setCurrentCategory = (moduleName, subjectName) => {
    this.setState(() => ({
      currentSubject: subjectName,
      currentModule: moduleName
    }));
  };

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

  renderContent() {
    const { knowledgeMap } = this.props;

    if (_.isEmpty(knowledgeMap)) {
      this.renderNoContent();
    }

    return (
      <div className={styles.container}>
        <div className={styles.categoriesContainer}>
          <h5 className={styles.subheading}>Categories</h5>
          <Categories
            knowledgeMap={knowledgeMap}
            setCategory={this.setCurrentCategory}
          />
        </div>
        <div className={styles.contentContainer}>
          <Content />
        </div>
      </div>
    );
  }

  render() {
    const { isFetching } = this.props;

    if (isFetching) {
      return <Loader />;
    }

    return (
      <div className={styles.mainContainer}>
        <h2 className={styles.headerContainer}>Learning Map</h2>
        {this.renderContent()}
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
