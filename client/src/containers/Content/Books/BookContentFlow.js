import React from "react";
// Styles
import styles from "./BookContentFlow.module.css";

const BookContentFlow = ({ content }) => (
  <div className={styles.bookInfo}>
    <div className={styles.bookThumbnail}>
      <img
        src={content.bookInfo.thumbnails.standard}
        alt={content.bookInfo.title}
      />
    </div>
    <div>
      <p className={styles.author}>{content.bookInfo.authors.join(", ")}</p>
      <p
        className={styles.pageCount}
      >{`${content.bookInfo.pageCount} pages`}</p>
    </div>
  </div>
);

export default BookContentFlow;
