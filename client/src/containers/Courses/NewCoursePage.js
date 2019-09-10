import React, { useState, useEffect } from "react";
import { useSelector, useDispatch, connect } from "react-redux";
import { useToasts } from "react-toast-notifications";
import _ from "lodash";
// Components
import {
  MainContainer,
  HeaderContainer
} from "../../components/PageContainers";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import ToastContent from "../../components/CustomToast/ToastContent";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { Formik } from "formik";
// API
import {
  REQUEST_NEW_COURSES,
  REQUEST_FAILURE_NEW_COURSES,
  RESOLVE_NEW_COURSES,
  UPDATE_NEW_COURSE,
  DELETE_NEW_COURSE,
  updateCourse,
  deleteCourse
} from "../../actions/newCourses";
// Styles
import styles from "./NewCourseList.module.css";

const NewCoursePage = ({ updateCourse, match, history }) => {
  const [currentCourse, setCurrentCourse] = useState({});
  const [showEditModal, setshowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Get courseId from URL
  const { courseId } = match.params;
  // Get courses data from global state
  const courses = useSelector(state => state.newCourses);
  const dispatch = useDispatch();
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
      // Dispatch to remove error since it has already been shown
      dispatch({ type: RESOLVE_NEW_COURSES });
    }
  }, [courses.error.message, dispatch, addToast]);

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
    dispatch({ type: REQUEST_NEW_COURSES });
    // Make request to delete course
    await deleteCourse(courseId);
    // Dispatch delete action
    dispatch({ type: DELETE_NEW_COURSE, payload: courseId });
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
        <div>
          <Button
            category="primary"
            onClick={handleShowEditModal}
            style={{ width: "75px", marginRight: "1rem" }}
          >
            Edit
          </Button>
          <Button
            category="danger"
            onClick={handleShowDeleteModal}
            style={{ width: "75px" }}
          >
            Delete
          </Button>
        </div>
      </HeaderContainer>
      {/* Edit Course modal */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit {currentCourse.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.modalBody}>
          <Formik
            initialValues={{
              name: currentCourse.name,
              shortname: currentCourse.shortname
            }}
            onSubmit={values => handleFormSubmit(currentCourse._id, values)}
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

const mapDispatchToProps = { updateCourse };

export default connect(
  null,
  mapDispatchToProps
)(NewCoursePage);