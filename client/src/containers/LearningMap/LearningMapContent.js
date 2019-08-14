import React from "react";
import _ from "lodash";
// Components
import Loader from "../../components/Loader";
// Styling
import styles from "./LearningMapContent.module.css";

const Content = ({ learningInfo }) => {
  if (_.isEmpty(learningInfo)) {
    return <Loader />;
  }

  return (
    <div className={styles.contentContainer}>
      <h3>{learningInfo.knowledgeModule.name}</h3>
    </div>
  );
};

export default Content;
