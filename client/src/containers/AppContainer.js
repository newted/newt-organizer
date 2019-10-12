import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withToastManager } from "react-toast-notifications";
// API
import { fetchCourses, resolveCourses } from "../actions/courses";
import { fetchCourseContent } from "../actions/userContent";
import { getLearningMap } from "../actions/learningMap";
// Components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PrivateRoute from "../components/PrivateRoute";
import ToastContent from "../components/CustomToast/ToastContent";
// Containers
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import LearnPage from "./Learn";
import CourseList from "./Courses/CourseList";
import CoursePage from "./Courses/CoursePage";
import AddContent from "./Content/AddContent";
import BookSearchResults from "./Content/BookSearchResults";
import ContentPage from "./Content/ContentPage";
import LearningMap from "./LearningMap";
// Styling
import styles from "./AppContainer.module.css";

class AppContainer extends Component {
  // Fetch data
  componentDidMount() {
    if (this.props.auth.exists && this.props.auth.item._id !== "demouser") {
      // Get a user's learning map
      this.props.getLearningMap();
      // Fetch user's courses
      this.props
        .fetchCourses()
        // For each course, fetch its content
        .then(courses =>
          courses.forEach(course => this.props.fetchCourseContent(course._id))
        )
        .catch(error => {
          // Display error notification
          this.props.toastManager.add(
            <ToastContent
              message="Something went wrong, could not fetch courses."
              error={error.message}
              displayRetry={false}
            />,
            { appearance: "error", autoDismiss: true }
          );
          // Call resolve action creator to set isFetching back to false
          this.props.resolveCourses();
        });
    }
  }

  render() {
    const { auth, sidebar } = this.props;

    return (
      <div className={styles.appContainer}>
        <Sidebar />
        <section
          className={
            sidebar.isCollapsed
              ? `${styles.pageContainer} ${styles.collapsed}`
              : `${styles.pageContainer} ${styles.expanded}`
          }
        >
          <Navbar />
          <Switch>
            <PrivateRoute path="/dashboard" component={Dashboard} auth={auth} />
            <PrivateRoute path="/profile" component={Profile} auth={auth} />
            {/* Courses based Routes */}
            <PrivateRoute
              path="/courses/:courseId"
              component={CoursePage}
              auth={auth}
            />
            <PrivateRoute path="/courses" component={CourseList} auth={auth} />
            {/* Learn Page routes */}
            <PrivateRoute
              path="/learn/:userContentId?"
              component={LearnPage}
              auth={auth}
            />
            {/* Content routes */}
            <PrivateRoute
              path="/content/add/book-search"
              component={BookSearchResults}
              auth={auth}
            />
            <PrivateRoute
              path="/content/add"
              component={AddContent}
              auth={auth}
            />
            <PrivateRoute
              path="/content/:userContentId"
              component={ContentPage}
              auth={auth}
            />
            {/* Learning map route */}
            <PrivateRoute
              path="/learning-map"
              component={LearningMap}
              auth={auth}
            />
          </Switch>
        </section>
      </div>
    );
  }
}

function mapStateToProps({ auth, sidebar }) {
  return {
    auth,
    sidebar
  };
}

const mapDispatchToProps = {
  fetchCourses,
  fetchCourseContent,
  resolveCourses,
  getLearningMap
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(AppContainer));
