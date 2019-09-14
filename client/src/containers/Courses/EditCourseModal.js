import React from "react";
// Components
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import Button from "../../components/Button";
import { courseFormSchema } from "./courseFormSchema";
// Styling
import styles from "./CoursePage.module.css";

const EditCourseModal = ({ show, onHide, course, onFormSubmit }) => (
  <Modal show={show} onHide={onHide} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Edit {course.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body className={styles.modalBody}>
      <Formik
        validationSchema={courseFormSchema}
        initialValues={{
          name: course.name
        }}
        onSubmit={values => onFormSubmit(course._id, values)}
      >
        {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
          <Form noValidate onSubmit={handleSubmit} className={styles.form}>
            <Form.Group controlId="courseName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">
                {errors.name}
              </Form.Control.Feedback>
            </Form.Group>
            <div className={styles.buttonContainer}>
              <Button
                category="primary"
                type="submit"
                style={{ width: "200px", marginTop: "1rem" }}
              >
                Update
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Modal.Body>
  </Modal>
);

export default EditCourseModal;
