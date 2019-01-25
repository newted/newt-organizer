import React, { Component } from 'react'
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
    return dropdownMenuState[assignment._id] = null
  })

  return dropdownMenuState
}

class CourseAssignmentList extends Component {
  state = {
    showDropdown: initializeDropdownMenuState(this.props.assignments),
    dropdownMenu: null,
    currentDropdownId: null // Passed to closeDropdown function so it knows
  }                         // which table row dropdown to close.

  openDropdown = (assignmentId, event) => {
    // console.log('Opening dropdown...')
    this.setState(prevState => ({
      showDropdown: {
        ...prevState.showDropdown,
        [assignmentId]: true
      },
      currentDropdownId: assignmentId
    }), () => {
      // console.log('Adding event listener')
      document.addEventListener('click', this.closeDropdown)
    })
  }

  closeDropdown = (event) => {
    // console.log('Closing dropdown...')
    const assignmentId = this.state.currentDropdownId

    if (!this.state.dropdownMenu.contains(event.target)) {
      this.setState(prevState => ({
        showDropdown: {
          ...prevState.showDropdown,
          [assignmentId]: false
        },
        currentDropdownId: null
      }), () => {
        // console.log('Removing event listener')
        document.removeEventListener('click', this.closeDropdown)
      })
    }
  }

  setDropdownMenu = (event) => {
    if (event && !this.state.dropdownMenu) {
      this.setState({ dropdownMenu: event })
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
          handleCloseDropdown={ this.closeDropdown }
          setDropdownMenu={ this.setDropdownMenu }
        />
      </div>
    )
  }
}

export default CourseAssignmentList
