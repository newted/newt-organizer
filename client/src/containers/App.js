import React, { Component, Fragment } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { showLoading, hideLoading } from 'react-redux-loading'
import LoadingBar from 'react-redux-loading'
// API
import { fetchUser } from '../actions/authedUser'
import { fetchPrograms } from '../actions/programs'
import { fetchAllCourses } from '../actions/courses'
// Components
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
// Containers
import Landing from './Landing'
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

const LandingContainer = () => <Route exact path='/' component={ Landing } />

const AppContainer = () => (
  <div className={ styles.appContainer }>
    <Sidebar />
    <section className={ styles.pageContainer }>
      <Navbar />
      <Switch>
        <Route path='/dashboard' component={ Dashboard } />
        <Route path='/programs/new' component={ AddProgram } />
        <Route
          path='/programs/:programId/courses/:courseId/assignments/add'
          component={ AddAssignment }
        />
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
  async componentDidMount() {
    await this.props.showLoading()
    await this.props.fetchUser()
    await this.props.fetchPrograms()
    await this.props.fetchAllCourses(Object.keys(this.props.programs.items))
    await this.props.hideLoading()
  }

  renderContent() {
    return (
      <Fragment>
        <Switch>
          <Route exact path='/' component={ LandingContainer } />
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
