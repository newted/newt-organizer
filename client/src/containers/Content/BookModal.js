import React from "react";
import _ from "lodash";
// Components
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Modal from "react-bootstrap/Modal";
import Button from "../../components/Button";
// Helpers
import { formatDate } from "./bookSearchHelpers";
// Styling
import styles from "./BookModal.module.css";

const BookModal = ({ show, onHide, onSubmit, bookInfo }) => (
  <Modal show={show} onHide={onHide} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>{`More Info for ${bookInfo.volumeInfo.title}`}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Row>
        <Col lg="1" md="0" sm="0" xs="0" />
        <Col lg="3" md="4" sm="4" xs="4">
          <div className={styles.imgContainer}>
            <img
              src={bookInfo.volumeInfo.imageLinks.thumbnail}
              className={styles.bookImg}
              width="100%"
              alt={bookInfo.volumeInfo.title}
            />
            <table style={{ marginTop: "1rem" }}>
              <tbody>
                <tr className={styles.tableRow}>
                  <td className={`${styles.tableCell} ${styles.moreInfoField}`}>
                    Publisher:
                  </td>
                  <td className={`${styles.tableCell} ${styles.moreInfoValue}`}>
                    {bookInfo.volumeInfo.publisher}
                  </td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={`${styles.tableCell} ${styles.moreInfoField}`}>
                    Date published:
                  </td>
                  <td className={`${styles.tableCell} ${styles.moreInfoValue}`}>
                    {formatDate(bookInfo.volumeInfo.publishedDate)}
                  </td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={`${styles.tableCell} ${styles.moreInfoField}`}>
                    Pages:
                  </td>
                  <td className={`${styles.tableCell} ${styles.moreInfoValue}`}>
                    {bookInfo.volumeInfo.pageCount}
                  </td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={`${styles.tableCell} ${styles.moreInfoField}`}>
                    ISBN-10:
                  </td>
                  <td className={`${styles.tableCell} ${styles.moreInfoValue}`}>
                    {bookInfo.volumeInfo.industryIdentifiers[1].identifier}
                  </td>
                </tr>
                <tr className={styles.tableRow}>
                  <td className={`${styles.tableCell} ${styles.moreInfoField}`}>
                    ISBN-13:
                  </td>
                  <td className={`${styles.tableCell} ${styles.moreInfoValue}`}>
                    {bookInfo.volumeInfo.industryIdentifiers[0].identifier}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Col>
        <Col lg="7" md="8" sm="8" xs="8">
          <h4 className={styles.title}>{bookInfo.volumeInfo.title}</h4>
          <p className={styles.author}>
            {!_.isEmpty(bookInfo.volumeInfo.authors)
              ? bookInfo.volumeInfo.authors.join(", ")
              : "N/A"}
          </p>
          <p className={styles.description}>
            {bookInfo.volumeInfo.description}
          </p>
        </Col>
        <Col lg="1" md="0" sm="0" xs="0" />
      </Row>
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>Close</Button>
      <Button onClick={() => onSubmit(bookInfo)} category="success">
        Add to Course
      </Button>
    </Modal.Footer>
  </Modal>
);

export default BookModal;
