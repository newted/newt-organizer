import React from "react";
import _ from "lodash";
// Styling
import styles from "./BookCard.module.css";

const BookCard = ({ bookInfo }) => {
  const { title, authors } = bookInfo.volumeInfo;

  return (
    <div className={styles.bookCard}>
      <img
        src={bookInfo.volumeInfo.imageLinks.smallThumbnail}
        alt={bookInfo.volumeInfo.title}
        className={styles.bookThumbnail}
      />
      <div>
        <h5 className={styles.title}>{bookInfo.volumeInfo.title}</h5>
        <p className={styles.author}>
          {!_.isEmpty(authors) ? authors.join(", ") : "N/A"}
        </p>
      </div>
    </div>
  );
};

export default BookCard;
