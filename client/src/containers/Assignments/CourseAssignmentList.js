import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import assignmentFields from './assignmentFields'
// Components
import Button from '../../components/Button'
import AssignmentTable from './AssignmentTable'
// Styling
import styles from './CourseAssignmentList.module.css'

// This function creates an object of [assignmentId]: null which is meant to
// denote whether the dropdown for the table row for that particular assignment
// is supposed to be visible or not.
const initializeDropdownMenuState = (assignments) => {
  const dropdownMenuState = {}

  assignments.map(assignment => {
    return dropdownMenuState[assignment._id] = false
  })

  return dropdownMenuState
}

class CourseAssignmentList extends Component {
  static propTypes = {
    programId: PropTypes.string.isRequired,
    courseId: PropTypes.string.isRequired,
    assignments: PropTypes.arrayOf(PropTypes.object).isRequired
  }

  state = {
    showDropdown: initializeDropdownMenuState(this.props.assignments),
    dropdownMenu: null,
    currentDropdownId: null // Passed to closeDropdown function so it knows
  }                         // which table row dropdown to close.

  // When clicking the Edit button, this component unmounts and when setState
  // is called to set specific showDropdown to false and currentDropdownId to
  // null, React throws an error:
  // "Warning: Can’t call setState (or forceUpdate) on an unmounted component"
  // To evade this (at least that's what this looks like), the _isMounted
  // property is created to ensure setState is only run if the component is
  // mounted.
  // See: https://www.youtube.com/watch?v=8BNdxFzMeVg
  _isMounted = false

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false
  }

  openDropdown = (assignmentId, event) => {
    if (this._isMounted) {
      this.setState(prevState => ({
        showDropdown: {
          ...prevState.showDropdown,
          [assignmentId]: true
        },
        currentDropdownId: assignmentId
      }), () => {
        document.addEventListener('click', this.closeDropdown)
      })
    }
  }

  closeDropdown = (event) => {
    const assignmentId = this.state.currentDropdownId

    if (this._isMounted) {
      if (!this.state.dropdownMenu.contains(event.target)) {
        this.setState(prevState => ({
          showDropdown: {
            ...prevState.showDropdown,
            [assignmentId]: false
          },
          currentDropdownId: null
        }), () => {
          document.removeEventListener('click', this.closeDropdown)
        })
      }
    }
  }

  setDropdownMenu = (event) => {
    if (this._isMounted) {
      if (event && !this.state.dropdownMenu) {
        this.setState({ dropdownMenu: event })
      }
    }
  }

  render() {
    const { programId, courseId, assignments } = this.props

    const data = {
      programId,
      courseId,
      assignments
    }

    return (
      <div className={ styles.assignmentsContainer }>
        <div className={ styles.headerContainer }>
          <h3 className={ styles.header }>Assignments</h3>
          <Link
            to={{ pathname: `/programs/${programId}/courses/${courseId}/assignments/add` }}
          >
            <Button additionalClass={ styles.addBtn }>
              Add Assignment
            </Button>
          </Link>
        </div>
        <AssignmentTable
          fields={ assignmentFields }
          data={ data }
          name='assignments'
          dropdownVisible={ this.state.showDropdown }
          handleOpenDropdown={ this.openDropdown }
          setDropdownMenu={ this.setDropdownMenu }
        />
      </div>
    )
  }
}

export default CourseAssignmentList
