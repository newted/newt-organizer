import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import _ from "lodash";
// Components
import {
  MainContainer,
  HeaderContainer
} from "../../components/PageContainers";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
// Styles
import styles from "./NewCourseList.module.css";

const NewCoursePage = ({ match }) => {
  const [currentCourse, setCurrentCourse] = useState({});
  const [showModal, setShowModal] = useState(false);

  // Get courseId from URL
  const { courseId } = match.params;
  // Get courses data from global state
  const courses = useSelector(state => state.newCourses);

  useEffect(() => {
    // Filter out course which matches page's courseId
    const [course] = _.filter(courses.items, course => course._id === courseId);
    // Set state
    setCurrentCourse(course);
  }, [courses.items, courseId]);

  // If fetching or current course hasn't been set yet, show Loader
  if (courses.isFetching || _.isEmpty(currentCourse)) {
    return <Loader />;
  }

  // Functions to set modal show state to true and false
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <MainContainer>
      <HeaderContainer>
        <h2>{currentCourse.name}</h2>
        <Button
          category="primary"
          onClick={handleShowModal}
          style={{ width: "100px" }}
        >
          Edit
        </Button>
      </HeaderContainer>
      <Modal show={showModal} onHide={handleCloseModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit {currentCourse.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Formik
            initialValues={{
              name: currentCourse.name,
              shortname: currentCourse.shortname
            }}
            onSubmit={values => console.log(values)}
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
                    Update
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </MainContainer>
  );
};

export default NewCoursePage;
