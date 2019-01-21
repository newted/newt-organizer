import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import assignmentFields from './assignmentFields'
// Components
import Button from '../../components/Button'
import Table from '../../components/Table'
// Styling
import styles from './CourseAssignmentList.module.css'

class CourseAssignmentList extends Component {
  state = {
    showDropdown: false,
    dropdownMenu: null
  }

  openDropdown = (event) => {
    this.setState({ showDropdown: true }, () => {
      document.addEventListener('click', this.closeDropdown)
    })
  }

  closeDropdown = (event) => {
    if (!this.state.dropdownMenu.contains(event.target)) {
      this.setState({ showDropdown: false}, () => {
        document.removeEventListener('click', this.closeDropdown)
      })
    }
  }

  setDropdownMenu = (event) => {
    if (event) {
      this.setState({ dropdownMenu: event })
    }
  }

  render() {
    const { programId, courseId, assignments } = this.props

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
        <Table
          fields={ assignmentFields }
          data={ assignments }
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
