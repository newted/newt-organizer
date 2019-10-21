import React, { useState } from "react";
import { connect } from "react-redux";
import { createPagesReadValidationSchema } from "./bookSearchHelpers";
// Components
import ProgressBar from "../../../components/ProgressBar";
import Button from "../../../components/Button";
import Modal from "react-bootstrap/Modal";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
// API
import { updatePagesRead } from "../../../actions/userContent";
// Styles
import styles from "./BookContentFlow.module.css";

const BookContentFlow = ({ content, updatePagesRead }) => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const calculatePercentComplete = (pagesRead, totalPages) => {
    return Math.round((pagesRead / totalPages) * 100);
  };

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
                <ProgressBar
                  percentComplete={calculatePercentComplete(
                    content.bookInfo.pagesRead,
                    content.bookInfo.pageCount
                  )}
                />
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
      {/* Modal with form to update pages read */}
      <Formik
        initialValues={{ pagesRead: content.bookInfo.pagesRead }}
        validationSchema={createPagesReadValidationSchema(
          content.bookInfo.pageCount
        )}
        enableReinitialize
        onSubmit={values => updatePagesRead(content._id, values)}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
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
                      type="number"
                      name="pagesRead"
                      value={values.pagesRead}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={!!errors.pagesRead}
                    />
                    <Form.Control.Feedback type="invalid">
                      {errors.pagesRead}
                    </Form.Control.Feedback>
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

const mapDispatchToProps = { updatePagesRead };

export default connect(
  null,
  mapDispatchToProps
)(BookContentFlow);
