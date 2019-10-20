import React, { useState } from "react";
// Components
import ProgressBar from "../../../components/ProgressBar";
import Button from "../../../components/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// Styles
import styles from "./BookContentFlow.module.css";

const BookContentFlow = ({ content }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <>
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
                <ProgressBar percentComplete={content.bookInfo.pagesRead} />
              </div>
              <Button
                additionalClass={styles.updateBtn}
                onClick={handleShowModal}
              >
                Update Progress
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Formik
        initialValues={{ pagesRead: content.bookInfo.pagesRead }}
        enableReinitialize
        onSubmit={values => alert(`I'm on page ${values.pagesRead}`)}
      >
        {({ handleSubmit, handleChange, handleBlur, values }) => (
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Update Progress</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form noValidate>
                <Form.Group as={Row} controlId="pages-read-modal">
                  <Form.Label column sm="3" xs="4">
                    I'm on page:
                  </Form.Label>
                  <Col sm="9" xs="8">
                    <Form.Control
                      type="text"
                      name="pagesRead"
                      value={values.pagesRead}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </Col>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={handleCloseModal}>Close</Button>
              <Button category="primary" onClick={handleSubmit}>
                Update
              </Button>
            </Modal.Footer>
          </Modal>
        )}
      </Formik>
    </>
  );
};

export default BookContentFlow;
