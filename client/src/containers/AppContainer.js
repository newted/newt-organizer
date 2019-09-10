import React, { Component } from "react";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
import { withToastManager } from "react-toast-notifications";
// API
import { fetchCourses, resolveCourses } from "../actions/newCourses";
import { getLearningMap } from "../actions/learningMap";
// Components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PrivateRoute from "../components/PrivateRoute";
import ToastContent from "../components/CustomToast/ToastContent";
// Containers
import Dashboard from "./Dashboard";
import Profile from "./Profile";
import ProgramList from "./Programs/ProgramList";
import AddProgram from "./Programs/AddProgram";
import ProgramPage from "./Programs/ProgramPage";
import EditProgram from "./Programs/EditProgram";
import AddCourse from "./Courses/AddCourse";
import CoursePage from "./Courses/CoursePage";
import EditCourse from "./Courses/EditCourse";
import NewCourseList from "./Courses/NewCourseList";
import NewCoursePage from "./Courses/NewCoursePage";
import AddAssignment from "./Assignments/AddAssignment";
import AssignmentList from "./Assignments/AssignmentList";
import EditAssignment from "./Assignments/EditAssignment";
import LearningMap from "./LearningMap";
// Styling
import styles from "./AppContainer.module.css";

class AppContainer extends Component {
  // Fetch data
  componentDidMount() {
    if (this.props.auth.exists) {
      // Get a user's learning map
      this.props.getLearningMap();
      // Fetch user's courses
      this.props.fetchCourses().catch(error => {
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
            {/* Programs based Routes */}
            <PrivateRoute
              path="/programs/new"
              component={AddProgram}
              auth={auth}
            />
            <PrivateRoute
              path="/programs/:programId/courses/:courseId/edit"
              component={EditCourse}
              auth={auth}
            />
            <PrivateRoute
              exact
              path="/programs/:programId/courses/add"
              component={AddCourse}
              auth={auth}
            />
            <PrivateRoute
              path="/programs/:programId/courses/:courseId"
              component={CoursePage}
              auth={auth}
            />
            <PrivateRoute
              path="/programs/:programId/edit"
              component={EditProgram}
              auth={auth}
            />
            <PrivateRoute
              path="/programs/:programId"
              component={ProgramPage}
              auth={auth}
            />
            <PrivateRoute
              path="/programs"
              component={ProgramList}
              auth={auth}
            />
            {/* Courses based Routes */}
            <PrivateRoute
              path="/courses/:courseId/assignments/add"
              component={AddAssignment}
              auth={auth}
            />
            <PrivateRoute
              path="/courses/:courseId/assignments/:assignmentId/edit"
              component={EditAssignment}
              auth={auth}
            />
            <PrivateRoute
              path="/courses/:courseId"
              component={NewCoursePage}
              auth={auth}
            />
            <PrivateRoute
              path="/courses"
              component={NewCourseList}
              auth={auth}
            />
            {/* Assignments based Routes */}
            <PrivateRoute
              path="/assignments/:assignmentId?"
              component={AssignmentList}
              auth={auth}
            />
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
  resolveCourses,
  getLearningMap
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(AppContainer));
