import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { allAssignmentTableFields } from './assignmentFields'
import { initializeDropdownMenuState } from '../../utils/dropdownHelpers'
import { statusDueDateSort } from '../../utils/containerHelpers'
// Components
import Button from '../../components/Button'
import AssignmentTable from './AssignmentTable'
// Styling
import styles from './AssignmentList.module.css'

class AssignmentList extends Component {
  state = {
    showDropdown: initializeDropdownMenuState(this.props.assignments),
    showCompleted: false,   // Doesn't show completed assignments by default
    dropdownMenu: null,
    currentDropdownId: null // Passed to closeDropdown function so it knows
  }                         // which table row dropdown to close.

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

    if (this._isMounted && !this.state.dropdownMenu.contains(event.target)) {
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

  setDropdownMenu = (event) => {
    if (this._isMounted && event && !this.state.dropdownMenu) {
      this.setState({ dropdownMenu: event })
    }
  }

  handleShowCompleted = (e) => {
    e.preventDefault()

    this.setState((prevState) => ({
      showCompleted: !prevState.showCompleted
    }))
  }

  render() {
    const { assignments } = this.props
    const { showCompleted } = this.state

    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <div className={ styles.assignmentsContainer }>
            <div className={ styles.headerContainer }>
              <h2>Your Assignments</h2>
            </div>
            <div className={ styles.tableContainer }>
              <div className={ styles.tableOptions }>
                <Button
                  additionalClass={ showCompleted
                    ? [styles.completedBtn, styles.selected].join(' ')
                    : styles.completedBtn
                  }
                  onClick={ this.handleShowCompleted }
                >
                  Show Completed
                </Button>
              </div>
              <AssignmentTable
                fields={ allAssignmentTableFields }
                assignments={ assignments }
                name='Assignments'
                showCompleted={ this.state.showCompleted }
                dropdownVisible={ this.state.showDropdown }
                handleOpenDropdown={ this.openDropdown }
                setDropdownMenu={ this.setDropdownMenu }
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps({ courses }) {
  const assignments = []

  _.forEach(courses.items, course => {
    _.forEach(course.assignments, assignment => {
      assignment['courseId'] = course._id
      assignment['courseName'] = course.name
      assignments.push(assignment)
    })
  })

  // Sort by status and due date
  statusDueDateSort(assignments)

  return {
    assignments
  }
}

export default connect(mapStateToProps)(AssignmentList)
