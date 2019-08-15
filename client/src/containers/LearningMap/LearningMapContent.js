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
      <h3 className={styles.header}>{learningInfo.knowledgeModule.name}</h3>
      <table>
        <thead>
          <tr>
            <th className={styles.topicsRow}>Topics</th>
            <th className={styles.ratingRow}>Confidence Rating</th>
          </tr>
        </thead>
        <tbody>
          {/* Map over topics and create a row for each topic, displaying the
              name and confidence rating */}
          {_.map(learningInfo.topics, ({ name, confidenceRating }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>{confidenceRating}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Content;
