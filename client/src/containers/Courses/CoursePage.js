import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import PropTypes from "prop-types";
import _ from "lodash";
// Components
import {
  MainContainer,
  HeaderContainer
} from "../../components/PageContainers";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import ToastContent from "../../components/CustomToast/ToastContent";
import CustomToggle from "../../components/Dropdown/CustomToggle";
import Modal from "react-bootstrap/Modal";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
import { courseFormSchema } from "./courseFormSchema";
// API
import {
  updateCourse,
  deleteCourse,
  resolveCourses
} from "../../actions/courses";
// Styles
import styles from "./CoursePage.module.css";
import { FiMoreHorizontal } from "react-icons/fi";

const NewCoursePage = ({
  courses,
  updateCourse,
  deleteCourse,
  resolveCourses,
  match,
  history
}) => {
  const [currentCourse, setCurrentCourse] = useState({});
  const [showEditModal, setshowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Get courseId from URL
  const { courseId } = match.params;
  const { addToast } = useToasts();

  useEffect(() => {
    // Filter out course which matches page's courseId
    const [course] = _.filter(courses.items, course => course._id === courseId);
    // Set state
    setCurrentCourse(course);
  }, [courses.items, courseId]);

  // Hook for error notification: if an error message exists, show error toast
  useEffect(() => {
    if (courses.error.message) {
      addToast(
        <ToastContent
          message="Something went wrong, could not update the course."
          error={courses.error.message}
          displayRetry={false}
        />,
        { appearance: "error", autoDismiss: true }
      );
      // Call resolve action to remove error since it has already been shown
      resolveCourses();
    }
  }, [courses.error.message, resolveCourses, addToast]);

  // Functions to set edit modal show state to true and false
  const handleShowEditModal = () => setshowEditModal(true);
  const handleCloseEditModal = () => setshowEditModal(false);
  // Functions to set delete modal show state to true and false
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  // Function to handle form submission (update course)
  const handleFormSubmit = async (courseId, values) => {
    // Make request to update course
    await updateCourse(courseId, values);
    handleCloseEditModal();
  };

  // Function to handle course deleting
  const handleDeleteCourse = async courseId => {
    // Make request to delete course
    await deleteCourse(courseId);
    // Go to Courses page
    history.push("/courses");
  };

  // If fetching or current course hasn't been set yet, show Loader
  if (courses.isFetching || _.isEmpty(currentCourse)) {
    return <Loader />;
  }

  return (
    <MainContainer>
      <HeaderContainer>
        <h2>{currentCourse.name}</h2>
        <div className={styles.optionsDropdown}>
          <Dropdown alignRight={true} drop="down">
            <Dropdown.Toggle id="course-page-more-dropdown" as={CustomToggle}>
              <FiMoreHorizontal size={25} />
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={handleShowEditModal}>Edit</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={handleShowDeleteModal}>
                Delete
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </HeaderContainer>
      {/* Edit Course modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit {currentCourse.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Formik
            validationSchema={courseFormSchema}
            initialValues={{
              name: currentCourse.name
            }}
            onSubmit={values => handleFormSubmit(currentCourse._id, values)}
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
      {/* Delete modal */}
      <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Course</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseDeleteModal}>Close</Button>
          <Button
            category="danger"
            onClick={() => handleDeleteCourse(currentCourse._id)}
          >
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </MainContainer>
  );
};

// Prop types
NewCoursePage.propTypes = {
  courses: PropTypes.shape({
    isFetching: PropTypes.bool,
    items: PropTypes.object,
    error: PropTypes.shape({
      message: PropTypes.string
    })
  }).isRequired,
  updateCourse: PropTypes.func.isRequired,
  deleteCourse: PropTypes.func.isRequired,
  resolveCourses: PropTypes.func.isRequired,
  // Router props
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  location: PropTypes.object
};

const mapDispatchToProps = { updateCourse, deleteCourse, resolveCourses };

const mapStateToProps = ({ courses }) => {
  return { courses };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCoursePage);
