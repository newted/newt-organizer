/* This is the page that's rendered when you click on Courses on the Sidebar */
import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import _ from 'lodash'
import styles from './CourseList.module.css'

class CourseList extends Component {
  renderCourseSections() {
    const { programs } = this.props

    return _.map(programs.items, ({ _id, name, institution, courses }) => {
      return (
        <div className={ styles.courseSection} key={ _id }>
          <div className={ styles.headings }>
            <div className={ styles.header }>
              { name }
            </div>
            <div className={ styles.institution }>
              { institution }
            </div>
          </div>
        </div>
      )
    })
  }

  render() {
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <div className={ styles.headerContainer }>
            <h2>Your Courses</h2>
          </div>
          <div className={ styles.coursesContainer }>
            { this.renderCourseSections() }
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth, programs }) {
  return {
    auth,
    programs
  }
}

export default connect(mapStateToProps)(CourseList)
