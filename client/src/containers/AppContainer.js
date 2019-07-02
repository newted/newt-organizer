import React, { Component } from "react";
import _ from "lodash";
import { Switch } from "react-router-dom";
import { connect } from "react-redux";
// API
import { fetchPrograms } from "../actions/programs";
import { fetchAllCourses } from "../actions/courses";
// Components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PrivateRoute from "../components/PrivateRoute";
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
import CourseList from "./Courses/CourseList";
import AddAssignment from "./Assignments/AddAssignment";
import AssignmentList from "./Assignments/AssignmentList";
import EditAssignment from "./Assignments/EditAssignment";
// Styling
import styles from "./AppContainer.module.css";

class AppContainer extends Component {
  componentDidMount() {
    if (this.props.auth.exists) {
      this.props
        .fetchPrograms()
        .then(programs => {
          if (_.isEmpty(programs)) {
            throw Error("no programs");
          }
          this.props.fetchAllCourses(programs.map(({ _id }) => _id));
        })
        .catch(error => console.log(error));
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
            <PrivateRoute path="/courses" component={CourseList} auth={auth} />
            {/* Assignments based Routes */}
            <PrivateRoute
              path="/assignments/:assignmentId?"
              component={AssignmentList}
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
  fetchPrograms,
  fetchAllCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AppContainer);
