import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import _ from "lodash";
// Components
import {
  MainContainer,
  HeaderContainer,
  ContentContainer
} from "../../components/PageContainers";
import MessageBox from "../../components/MessageBox";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
import ToastContent from "../../components/CustomToast/ToastContent";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
// API
import { createCourse, resolveCourses } from "../../actions/newCourses";
// Styling
import styles from "./NewCourseList.module.css";
import { UniversityIcon } from "../../utils/icons";

const NewCoursePage = ({ courses, createCourse, resolveCourses }) => {
  const [showModal, setShowModal] = useState(false);

  // Functions to set modal show state to true and false
  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  // Function to handle form submission (API request + dispatch action)
  const handleFormSubmit = async values => {
    await createCourse(values);
    handleCloseModal();
  };

  const { addToast } = useToasts();
  // Hook for error notification
  useEffect(() => {
    if (courses.error.message) {
      addToast(
        <ToastContent
          message="Something went wrong, could not create the course."
          error={courses.error.message}
          displayRetry={false}
        />,
        { appearance: "error", autoDismiss: true }
      );
      // Call resolve action to remove error since it has already been shown
      resolveCourses();
    }
  }, [courses.error.message, resolveCourses, addToast]);

  // Message for no courses
  const renderNoContent = () => (
    <MessageBox>
      There are no courses to display. To create a course, click on the{" "}
      <span className={styles.createCourse}>Create Course</span> button.
    </MessageBox>
  );

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
    } else {
      return renderNoContent();
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
      <ContentContainer
        className={!_.isEmpty(courses.items) ? styles.cardContainer : ""}
      >
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

const mapStateToProps = ({ newCourses }) => {
  return { courses: newCourses };
};
const mapDispatchToProps = { createCourse, resolveCourses };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCoursePage);
