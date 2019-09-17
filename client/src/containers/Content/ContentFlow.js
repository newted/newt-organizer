// Component that shows the content on the right tab in the content page
import React from "react";
import moment from "moment";
import _ from "lodash";
// Components
import Button from "../../components/Button";
import Dropdown from "react-bootstrap/Dropdown";
import CustomToggle from "../../components/Dropdown/CustomToggle";
// Styling
import styles from "./ContentFlow.module.css";
import { FiCheckSquare, FiMoreVertical } from "react-icons/fi";

const ContentFlow = ({ content, showEditModal, showDeleteModal }) => (
  <div className={styles.content}>
    <div className={styles.contentHeaderContainer}>
      <h2 className={styles.contentHeader}>{content.name}</h2>
      <div className={styles.headerInfo}>
        <h5 className={styles.date}>
          Due {moment(content.dateDue).format("MMM DD")}
        </h5>
        <span style={{ height: "26px" }}>
          <FiCheckSquare size={26} className={styles.check} />
        </span>
        <Dropdown alignRight={true} drop="down" className={styles.dropdown}>
          <Dropdown.Toggle id="content-dropdown" as={CustomToggle}>
            <FiMoreVertical size={18} />
          </Dropdown.Toggle>
          <Dropdown.Menu className={styles.dropdownMenu}>
            <Dropdown.Item onClick={showEditModal}>Edit</Dropdown.Item>
            <Dropdown.Item onClick={showDeleteModal}>Delete</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
    <div className={styles.flowContainer}>
      {/* If the content has a quiz and is from youtube, show steps */}
      {content.hasQuiz &&
        content.sourceInfo.name.toLowerCase() === "youtube" && (
          <h5 className={styles.instruction}>1. Watch the video</h5>
        )}
      {/* If the content is from Youtube, display video iframe */}
      {content.sourceInfo.name.toLowerCase() === "youtube" && (
        <div className={styles.videoContainer}>
          <iframe
            id="ytplayer"
            type="text/html"
            title={content.name}
            width="640"
            height="360"
            src={`https://www.youtube.com/embed/${content.videoInfo.videoId}`}
            frameBorder="0"
            allowFullScreen
          />
        </div>
      )}
      {/* If content has knowledge tracking, display related information.
          (Just Knowledge module for now) */}
      {content.hasKnowledgeTracking && (
        <div className={styles.knowledgeInfoContainer}>
          <h4>Learning Map Info</h4>
          <div className={styles.knowledgeInfoItem}>
            <p>Main Subject:</p>
            <p>{content.knowledgeModule.name}</p>
          </div>
          <div className={styles.knowledgeInfoItem}>
            <p>Topics Covered:</p>
            <p>
              {content.contentInfo.primaryTopics
                .map(({ name }) => name)
                .join(", ")}
            </p>
          </div>
        </div>
      )}
      {/* If assignment has a description, display it */}
      {content.description && (
        <>
          <h5 className={styles.subheading}>Description</h5>
          <p style={{ marginBottom: "1.75rem" }}>{content.description}</p>
        </>
      )}
      {/* If assignment has a quiz, add step + display take quiz button */}
      {content.hasQuiz && (
        <>
          <h5 className={styles.instruction}>2. Check your understanding</h5>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Button
              category="primary"
              onClick={() => alert("Quiz")}
              style={{ width: "50%" }}
            >
              {_.isEmpty(content.quizInfo)
                ? "Take the quiz"
                : "Continue quiz/See results"}
            </Button>
          </div>
        </>
      )}
    </div>
  </div>
);

export default ContentFlow;
