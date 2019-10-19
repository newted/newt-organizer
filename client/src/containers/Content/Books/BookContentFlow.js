import React from "react";
// Components
import ProgressBar from "../../../components/ProgressBar";
import Button from "../../../components/Button";
// Styles
import styles from "./BookContentFlow.module.css";

const BookContentFlow = ({ content }) => (
  <div className={styles.bookSection}>
    <div className={styles.bookThumbnail}>
      <img
        src={content.bookInfo.thumbnails.standard}
        alt={content.bookInfo.title}
      />
    </div>
    <div className={styles.bookInfo}>
      <p className={styles.author}>{content.bookInfo.authors.join(", ")}</p>
      <p
        className={styles.pageCount}
      >{`${content.bookInfo.pageCount} pages`}</p>
      <div>
        <p className={styles.progressLabel}>Progress</p>
        <div className={styles.progressBarContainer}>
          <div className={styles.progressBar}>
            <ProgressBar percentComplete={70} />
          </div>
          <Button
            additionalClass={styles.updateBtn}
            onClick={() => alert("Updating progress...")}
          >
            Update Progress
          </Button>
        </div>
      </div>
    </div>
  </div>
);

export default BookContentFlow;
