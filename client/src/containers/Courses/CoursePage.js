import React, { Component } from 'react'
import _ from 'lodash'
import { Redirect, Link } from 'react-router-dom'
import { connect } from 'react-redux'
import LoadingBar from 'react-redux-loading'
// Components
import Button from '../../components/Button'
// Styling
import styles from './CoursePage.module.css'

class CoursePage extends Component {
  render() {
    const { programId, course } = this.props
    // Redirect to Landing page if not authenticated
    if(!this.props.auth) {
      return <Redirect to='/' />
    }

    if (!course) {
      return <LoadingBar />
    }

    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <div className={ styles.headerContainer }>
            <h2>{ course.name }</h2>
            <div>
              <Link
                to={{ pathname: `/programs/${programId}/courses/${course._id}/edit` }}
              >
                <Button
                  text='Edit'
                  additionalClass={ styles.editBtn }
                />
              </Link>
              <Button
                text='Delete'
                additionalClass={ styles.deleteBtn }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ auth, programs }, props) {
  const { programId, courseId } = props.match.params

  const program = _.filter(
    programs.items,
    program => program._id === programId
  )[0]

  const course = program
    ? _.filter(
        program.courses,
        course => course._id === courseId
      )[0]
    : null

  return {
    auth,
    programId,
    course
  }
}

export default connect(mapStateToProps)(CoursePage)
