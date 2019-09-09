import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import _ from "lodash";
// Components
import {
  MainContainer,
  HeaderContainer,
  ContentContainer
} from "../../components/PageContainers";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
// API
import {
  REQUEST_NEW_COURSES,
  CREATE_NEW_COURSE,
  createCourse
} from "../../actions/newCourses";
// Styling
import styles from "./NewCourseList.module.css";
import { UniversityIcon } from "../../utils/icons";

const NewCoursePage = () => {
  const [showModal, setShowModal] = useState(false);

  // Functions to set modal show state to true and false
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Get courses data from global state
  const courses = useSelector(state => state.newCourses);
  // Get dispatch
  const dispatch = useDispatch();

  // Function to handle form submission (API request + dispatch action)
  const handleFormSubmit = async values => {
    dispatch({ type: REQUEST_NEW_COURSES });
    const data = await createCourse(values);
    dispatch({ type: CREATE_NEW_COURSE, payload: data });
    handleCloseModal();
  };

  // Function to render course cards
  const renderCards = () => {
    if (!_.isEmpty(courses.items)) {
      return _.map(courses.items, course => (
        <Card
          title={course.name}
          path={`/courses/${course._id}`}
          icon={UniversityIcon}
          additionalClass={styles.cardColor}
          key={course._id}
        />
      ));
    }
  };

  // If courses are being fetching show loading indicator
  if (courses.isFetching) {
    return <Loader />;
  }

  return (
    <MainContainer>
      <HeaderContainer>
        <h2>Courses</h2>
        <Button category="success" onClick={handleShowModal}>
          Create Course
        </Button>
      </HeaderContainer>
      <ContentContainer className={styles.cardContainer}>
        {renderCards()}
      </ContentContainer>
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
    </MainContainer>
  );
};

export default NewCoursePage;
