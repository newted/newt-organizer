import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { useToasts } from "react-toast-notifications";
import PropTypes from "prop-types";
import _ from "lodash";
// Components
import {
  MainContainer,
  HeaderContainer,
  ContentContainer
} from "../../components/PageContainers";
import Loader from "../../components/Loader";
import Button from "../../components/Button";
import EditCourseModal from "./EditCourseModal";
import DeleteItemModal from "../../components/Modal/DeleteItemModal";
import ToastContent from "../../components/CustomToast/ToastContent";
import CustomToggle from "../../components/Dropdown/CustomToggle";
import CourseContent from "./CourseContent";
import Dropdown from "react-bootstrap/Dropdown";
// API
import {
  updateCourse,
  deleteCourse,
  resolveCourses
} from "../../actions/courses";
import { fetchCourseContent } from "../../actions/userContent";
// Styles
import styles from "./CoursePage.module.css";
import { FiMoreHorizontal } from "react-icons/fi";

const NewCoursePage = ({
  courses,
  courseContent,
  isFetching,
  updateCourse,
  deleteCourse,
  resolveCourses,
  fetchCourseContent,
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
    if (!courses.items[courseId]) {
      // Fetch content for the course and set to state
      fetchCourseContent(courseId);
    }
  }, [courseId, fetchCourseContent]);

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
  const handleDeleteCourse = async () => {
    // Make request to delete course
    await deleteCourse(courseId);
    // Go to Courses page
    history.push("/courses");
  };

  // If fetching or current course hasn't been set yet, show Loader
  if (isFetching || _.isEmpty(currentCourse)) {
    return <Loader />;
  }

  return (
    <MainContainer>
      <HeaderContainer>
        <h2>{currentCourse.name}</h2>
        <div className={styles.optionsContainer}>
          <Link
            to={{
              pathname: "/content/add",
              // Pass courseId to Add Content route (which is sent to component)
              state: { courseId: currentCourse._id }
            }}
          >
            <Button category="success" style={{ marginRight: "1.5rem " }}>
              Add Content
            </Button>
          </Link>
          <div className={styles.optionsDropdown}>
            <Dropdown alignRight={true} drop="down">
              <Dropdown.Toggle id="course-page-more-dropdown" as={CustomToggle}>
                <FiMoreHorizontal size={25} />
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={handleShowEditModal}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleShowDeleteModal}>
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </HeaderContainer>
      <ContentContainer
        className={!_.isEmpty(courseContent) ? styles.cardContainer : ""}
      >
        <CourseContent courseContent={courseContent} />
      </ContentContainer>
      {/* Edit Course modal */}
      <EditCourseModal
        show={showEditModal}
        onHide={handleCloseEditModal}
        course={currentCourse}
        onFormSubmit={handleFormSubmit}
      />
      {/* Delete modal */}
      <DeleteItemModal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        itemToDelete="course"
        onDelete={handleDeleteCourse}
      />
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

const mapDispatchToProps = {
  updateCourse,
  deleteCourse,
  resolveCourses,
  fetchCourseContent
};

const mapStateToProps = ({ courses, userContent }, props) => {
  const { courseId } = props.match.params;

  const course = courses.items ? courses.items[courseId] : null;
  let courseContent = [];

  // Get content info for the particular course
  if (!_.isEmpty(course) && !_.isEmpty(userContent.items)) {
    _.forEach(course.individualContent, contentId =>
      courseContent.push(userContent.items[contentId])
    );
  }

  // Set to true if either is fetching
  const isFetching = courses.isFetching || userContent.isFetching;

  return { courses, courseContent, isFetching };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewCoursePage);
