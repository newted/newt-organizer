import React from "react";
import _ from "lodash";
// Components
import Loader from "../../components/Loader";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import ProgressBar from "../../components/ProgressBar";
// Styling
import { FiInfo } from "react-icons/fi";
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
            <th className={styles.ratingRow}>
              <span className={styles.ratingRowTitle}>Confidence Rating</span>
              <OverlayTrigger
                trigger="hover"
                placement="top"
                overlay={
                  <Popover id="confidence-rating-info">
                    <Popover.Content className={styles.borderShadow}>
                      The percentages "gained" below are arbitrary - just a
                      placeholder until a more objective measure of "knowledge
                      gained" has been designed.
                    </Popover.Content>
                  </Popover>
                }
              >
                <div className={styles.ratingInfoIcon}>
                  <FiInfo size={14} />
                </div>
              </OverlayTrigger>
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Map over topics and create a row for each topic, displaying the
              name and confidence rating */}
          {_.map(learningInfo.topics, ({ name, confidenceRating }) => (
            <tr key={name}>
              <td className={styles.topicsRow}>{name}</td>
              <td className={styles.ratingRow}>
                <ProgressBar percentComplete={confidenceRating} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Content;
