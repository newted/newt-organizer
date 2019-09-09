import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
// Components
import Button from "../../components/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
// API
import { CREATE_NEW_COURSE, createCourse } from "../../actions/newCourses";
// Styling
import styles from "./NewCoursePage.module.css";

const NewCoursePage = () => {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const courses = useSelector(state => state.newCourses);
  const dispatch = useDispatch();

  const handleFormSubmit = async values => {
    const data = await createCourse(values);
    dispatch({ type: CREATE_NEW_COURSE, payload: data });
    handleCloseModal();
  };

  return (
    <div className={styles.mainContainer}>
      <div className={styles.headerContainer}>
        <h2>Courses</h2>
        <Button category="success" onClick={handleShowModal}>
          Create Course
        </Button>
      </div>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create a Course</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Formik
            initialValues={{ name: "", shortname: "" }}
            onSubmit={values => handleFormSubmit(values)}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              values,
              touched,
              isValid,
              errors
            }) => (
              <Form noValidate onSubmit={handleSubmit} className={styles.form}>
                <Form.Group controlId="courseName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="courseShortName">
                  <Form.Label>Short Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="shortname"
                    value={values.shortname}
                    onChange={handleChange}
                  />
                </Form.Group>
                <div className={styles.buttonContainer}>
                  <Button
                    category="primary"
                    type="submit"
                    style={{ width: "200px", marginTop: "1rem" }}
                  >
                    Create
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
      {JSON.stringify(courses.items)}
    </div>
  );
};

export default NewCoursePage;
