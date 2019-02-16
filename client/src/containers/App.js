import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading'
import LoadingBar from 'react-redux-loading'
// API
import { fetchUser, isAuthenticated } from '../actions/authedUser'
import { fetchPrograms } from '../actions/programs'
import { fetchAllCourses } from '../actions/courses'
// Components
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
// Containers
import Landing from './Landing'
import Login from './Login'
import Dashboard from './Dashboard'
import ProgramList from './Programs/ProgramList'
import AddProgram from './Programs/AddProgram'
import ProgramPage from './Programs/ProgramPage'
import EditProgram from './Programs/EditProgram'
import AddCourse from './Courses/AddCourse'
import CoursePage from './Courses/CoursePage'
import EditCourse from './Courses/EditCourse'
import CourseList from './Courses/CourseList'
import AddAssignment from './Assignments/AddAssignment'
import AssignmentList from './Assignments/AssignmentList'
import EditAssignment from './Assignments/EditAssignment'
// Styling
import styles from './App.module.css'

const LandingContainer = () => (
  <Switch>
    <Route exact path='/' component={ Landing } />
    <Route exact path='/login' component={ Login } />
  </Switch>
)

const AppContainer = () => (
  <div className={ styles.appContainer }>
    <Sidebar />
    <section className={ styles.pageContainer }>
      <Navbar />
      <Switch>
        <Route path='/dashboard' component={ Dashboard } />
        <Route path='/programs/new' component={ AddProgram } />
        <Route
          path='/programs/:programId/courses/:courseId/edit'
          component={ EditCourse }
        />
        <Route
          exact path='/programs/:programId/courses/add'
          component={ AddCourse }
        />
        <Route
          path='/programs/:programId/courses/:courseId'
          component={ CoursePage }
        />
        <Route path='/programs/:programId/edit' component={ EditProgram } />
        <Route path='/programs/:programId' component={ ProgramPage } />
        <Route path='/programs' component={ ProgramList } />
        <Route
          path='/courses/:courseId/assignments/add'
          component={ AddAssignment }
        />
        <Route
          path='/courses/:courseId/assignments/:assignmentId/edit'
          component={ EditAssignment }
        />
        <Route path='/courses' component={ CourseList } />
        <Route path='/assignments' component={ AssignmentList } />
      </Switch>
    </section>
  </div>
)

class App extends Component {
  componentDidMount() {
    this.props.showLoading()
    this.props.fetchUser()
      .then(() => this.props.fetchPrograms())
      .then(() => this.props.fetchAllCourses(Object.keys(this.props.programs.items)))
      .then(() => this.props.hideLoading())
      .catch((error) => this.props.hideLoading())
  }

  // After the first render, componentDidMount is invoked and if not
  // authenticated, then this invokation makes sure that program data is fetched
  // as soon as the user signs in. If the user is already signed in and just,
  // say, refreshes the page, the data is fetched in componentDidMount and this
  // won't run since the if statement condition returns false.
  componentDidUpdate(prevProps) {
    // If the auth object is not exactly the same and it's not false, fetch
    // programs
    if (!(typeof prevProps.auth === typeof this.props.auth) && isAuthenticated()) {
      console.log('update')
      this.props.fetchPrograms()
    }
  }

  renderContent() {
    return (
      <Fragment>
        <Switch>
          <Route exact path='/' component={ LandingContainer } />
          <Route exact path='/login' component={ LandingContainer } />
          <Route component={ AppContainer } />
        </Switch>
      </Fragment>
    )
  }

  render() {
    return (
      <BrowserRouter>
        <Fragment>
          <LoadingBar />
          { this.props.loading === true
            ? null
            : this.renderContent()
          }
        </Fragment>
      </BrowserRouter>
    )
  }
}

function mapStateToProps({ auth, programs }) {
  return {
    loading: auth === null,
    auth,
    programs
  }
}

const mapDispatchToProps = {
  showLoading,
  hideLoading,
  fetchUser,
  fetchPrograms,
  fetchAllCourses
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
