import React from "react";
import _ from "lodash";
// Styling
import styles from "./BookCard.module.css";
// Helpers
import { shortenText } from "../../utils/containerHelpers";

const BookCard = ({ bookInfo }) => {
  const { title, authors, pageCount, description } = bookInfo.volumeInfo;

  return (
    <div className={styles.bookCard}>
      <img
        src={bookInfo.volumeInfo.imageLinks.smallThumbnail}
        alt={bookInfo.volumeInfo.title}
        className={styles.bookThumbnail}
      />
      <div>
        <h5 className={styles.title}>{title}</h5>
        <p className={styles.author}>
          {!_.isEmpty(authors) ? authors.join(", ") : "N/A"}
        </p>
        {pageCount && (
          <p className={styles.pageCount}>{`${pageCount} pages`}</p>
        )}
        {description && (
          <p className={styles.description}>{shortenText(description, 70)}</p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
