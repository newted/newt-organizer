import React, { Component, Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { showLoading, hideLoading } from "react-redux-loading";
import LoadingBar from "react-redux-loading";
// API
import { fetchUser, isAuthenticated } from "../actions/authedUser";
import { fetchPrograms } from "../actions/programs";
import { fetchAllCourses } from "../actions/courses";
// Components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PrivateRoute from "../components/PrivateRoute";
// Containers
import Landing from "./Landing";
import Login from "./Login";
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
import styles from "./App.module.css";

const LandingContainer = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route exact path="/login" component={Login} />
  </Switch>
);

const AppContainer = (auth, sidebar) => (
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
        <PrivateRoute path="/programs/new" component={AddProgram} auth={auth} />
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
        <PrivateRoute path="/programs" component={ProgramList} auth={auth} />
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

class App extends Component {
  componentDidMount() {
    this.props.showLoading();
    // If user already exists (if coming after signing in), don't fetch again
    if (this.props.auth.exists) {
      this.props
        .fetchPrograms()
        .then(() =>
          this.props.fetchAllCourses(Object.keys(this.props.programs.items))
        )
        .then(() => this.props.hideLoading())
        .catch(error => this.props.hideLoading());
    } else {
      this.props
        .fetchUser()
        .then(() => this.props.fetchPrograms())
        .then(() =>
          this.props.fetchAllCourses(Object.keys(this.props.programs.items))
        )
        .then(() => this.props.hideLoading())
        .catch(error => this.props.hideLoading());
    }
  }

  // After the first render, componentDidMount is invoked and if not
  // authenticated, then this invokation makes sure that program data is fetched
  // as soon as the user signs in. If the user is already signed in and just,
  // say, refreshes the page, the data is fetched in componentDidMount and this
  // won't run since the if statement condition returns false.
  componentDidUpdate(prevProps) {
    // If the previous auth state was non-existant (i.e. no authenticated user)
    // and the current auth state exists (user authenticated), then fetch
    // programs.
    if (!prevProps.auth.exists && this.props.auth.exists && isAuthenticated()) {
      this.props.fetchPrograms();
    }
  }

  renderContent() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={LandingContainer} />
          <Route exact path="/login" component={LandingContainer} />
          <Route
            render={() => AppContainer(this.props.auth, this.props.sidebar)}
          />
        </Switch>
      </Fragment>
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          {this.props.loading === true ? null : this.renderContent()}
        </Fragment>
      </BrowserRouter>
    );
  }
}

function mapStateToProps({ auth, programs, sidebar }) {
  return {
    loading: auth.isFetching,
    auth,
    programs,
    sidebar
  };
}

const mapDispatchToProps = {
  showLoading,
  hideLoading,
  fetchUser,
  fetchPrograms,
  fetchAllCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
