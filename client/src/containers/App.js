import React, { Component, Fragment } from "react";
import _ from "lodash";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
// API
import { fetchUser } from "../actions/authedUser";
import { fetchPrograms } from "../actions/programs";
import { fetchAllCourses } from "../actions/courses";
// Components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import PrivateRoute from "../components/PrivateRoute";
import Loader from "../components/Loader";
import FourOhFour from "../components/404";
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
    this.props
      .fetchUser()
      .then(() => this.props.fetchPrograms())
      .then(programs => {
        if (_.isEmpty(programs)) {
          throw Error("no programs");
        }
        this.props.fetchAllCourses(programs.map(({ _id }) => _id));
      })
      .catch(error => console.log(error));
  }

  // Using setTimeout feels very hacky and inelegant but it's seems to work
  // better, atleast under some circumstances (faster than some threshold
  // Internet speeds). Certainly not the right or best solution, but it does
  // avoid the multiple fetching problem (without having to fetch inside every
  // component). Still unsure which direction to go regarding fetching so let's
  // see how this goes.
  componentDidUpdate(prevProps) {
    setTimeout(() => {
      if (
        !prevProps.auth.exists &&
        this.props.auth.exists &&
        _.isEmpty(this.props.programs.items) &&
        !this.props.programs.isFetching
      ) {
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
    }, 300);
  }

  renderContent() {
    return (
      <Fragment>
        <Switch>
          <Route exact path="/" component={LandingContainer} />
          <Route exact path="/login" component={LandingContainer} />
          {/* If the paths are any of the ones in the array, render
            AppContainer (i.e. the app stuff that needs the sidebar) */}
          <Route
            path={[
              "/dashboard",
              "/programs",
              "/courses",
              "/assignments",
              "/profile"
            ]}
            render={() => AppContainer(this.props.auth, this.props.sidebar)}
          />
          {/* If none of the paths match show the 404 page */}
          <Route component={FourOhFour} />
        </Switch>
      </Fragment>
    );
  }

  render() {
    return (
      <BrowserRouter>
        {this.props.loading === true ? <Loader /> : this.renderContent()}
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
  fetchUser,
  fetchPrograms,
  fetchAllCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
