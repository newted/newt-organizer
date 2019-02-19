/* This is the page that's rendered when you click on Courses on the Sidebar */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
import _ from 'lodash'
// API
import { fetchAllCourses } from '../../actions/courses'
// Components
import Card from '../../components/Card'
// Styling
import styles from './CourseList.module.css'
import { BookIcon } from '../../utils/icons'

class CourseList extends Component {
  static propTypes = {
    auth: PropTypes.object.isRequired,
    programs: PropTypes.shape({
      items: PropTypes.object
    }),
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  }

  componentDidMount() {
    this.props.fetchAllCourses(Object.keys(this.props.programs.items))
  }

  renderCards(programId, courseList) {
    const { courses } = this.props

    if (_.isEmpty(courses.items)) {
      return <LoadingBar />
    } else {
      return _.map(courseList, courseId => {
        return (
          <Card
            path={ `/programs/${programId}/courses/${courseId}` }
            title={ courses.items[courseId].name }
            icon={ BookIcon }
            additionalClass={ styles.cardColor }
            key={ courseId }
          />
        )
      })
    }
  }

  renderNoContent() {
    const programLink = (
      <Link to="/programs" className={styles.link}>Programs</Link>
    )

    if (Object.keys(this.props.programs.items).length === 0) {
      return (
        <div className={ styles.message }>
          You aren't in any programs. Go to the { programLink } page from the
          sidebar to create a Program.
        </div>
      )
    }

    return (
      <div className={ styles.message }>
        There are no courses to display. Add a course in any of your {" "}
        { programLink } to see your courses listed here.
      </div>
    )
  }

  renderCourseSections() {
    const { programs } = this.props

    return _.map(programs.items, ({ _id, name, institution, courses }) => {
      const courseList = courses
      // if (courses.length > 0) {
      return (
        <div className={ styles.courseSection} key={ _id }>
          <div className={ styles.headings }>
            <Link
              to={ `/programs/${_id}` }
              className={ styles.header }
            >
              { name }
            </Link>
            <div className={ styles.institution }>
              { institution }
            </div>
          </div>
          <div className={ styles.cardContainer }>
            { this.renderCards(_id, courseList) }
          </div>
        </div>
      )
      // }
    })
  }

  render() {
    const { auth, programs, courses } = this.props
    // Redirect to Landing page if not authenticated
    if (!auth.exists) {
      return <Redirect to='/' />
    }

    // Need to get a better loading mechanism
    if (auth.isFetching || programs.isFetching || courses.isFetching) {
      return <LoadingBar />
    }

    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <div className={ styles.headerContainer }>
            <h2>Your Courses</h2>
          </div>
          <div className={ styles.coursesContainer }>
            {
              Object.keys(courses.items).length > 0
              ? this.renderCourseSections()
              : this.renderNoContent()
            }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth, programs, courses }) {
  return {
    auth,
    programs,
    courses
  }
}

export default connect(mapStateToProps, { fetchAllCourses })(CourseList)
