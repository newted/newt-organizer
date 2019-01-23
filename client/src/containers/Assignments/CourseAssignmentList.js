import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import assignmentFields from './assignmentFields'
// Components
import Button from '../../components/Button'
import Table from '../../components/Table'
// Styling
import styles from './CourseAssignmentList.module.css'

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
    currentDropdownId: null
  }

  addCurrentDropdownId = (assignmentId) => {
    this.setState({
      currentDropdownId: assignmentId
    })
  }

  removeCurrentDropdownId = () => {
    this.setState({
      currentDropdownId: null
    })
  }

  openDropdown = (assignmentId, event) => {
    console.log('Opening dropdown...')
    this.setState(prevState => ({
      showDropdown: {
        ...prevState.showDropdown,
        [assignmentId]: true
      }
    }), () => {
      console.log('Adding event listener')
      this.addCurrentDropdownId(assignmentId)
      document.addEventListener('click', this.closeDropdown)
    })
  }

  closeDropdown = (event) => {
    console.log('Closing dropdown...')
    const assignmentId = this.state.currentDropdownId

    if (!this.state.dropdownMenu.contains(event.target)) {
      this.setState(prevState => ({
        showDropdown: {
          ...prevState.showDropdown,
          [assignmentId]: false
        }
      }), () => {
        console.log('Removing event listener')
        this.removeCurrentDropdownId()
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
    console.log(this.state)

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
