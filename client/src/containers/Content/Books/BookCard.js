import React from "react";
import _ from "lodash";
// Styling
import styles from "./BookCard.module.css";
import { FiPlus } from "react-icons/fi";
// Helpers
import { shortenText } from "../../../utils/containerHelpers";

const BookCard = ({ bookInfo, onClick, onSubmit }) => {
  const { title, authors, pageCount, description } = bookInfo.volumeInfo;

  return (
    <div className={styles.bookCard} onClick={() => onClick(bookInfo)}>
      <img
        src={
          !_.isEmpty(bookInfo.volumeInfo.imageLinks)
            ? bookInfo.volumeInfo.imageLinks.smallThumbnail
            : null
        }
        alt={bookInfo.volumeInfo.title}
        className={styles.bookThumbnail}
      />
      <div>
        <div className={styles.titleContainer}>
          <h5 className={styles.title}>{title}</h5>
          <div
            className={styles.iconContainer}
            onClick={() => onSubmit(bookInfo)}
          >
            <FiPlus size={19} color="white" />
          </div>
        </div>

        <p className={styles.author}>
          {!_.isEmpty(authors) ? authors.join(", ") : "N/A"}
        </p>
        {pageCount && (
          <p className={styles.pageCount}>
            {pageCount ? `${pageCount} pages` : null}
          </p>
        )}
        {description && (
          <p className={styles.description}>{shortenText(description, 70)}</p>
        )}
      </div>
    </div>
  );
};

export default BookCard;
