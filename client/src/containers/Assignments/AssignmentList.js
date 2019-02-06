import React, { Component } from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'
import { assignmentTableFields } from './assignmentFields'
// Components
import AssignmentTable from './AssignmentTable'
// Styling
import styles from './AssignmentList.module.css'

const initializeDropdownMenuState = (assignments) => {
  const dropdownMenuState = {}

  assignments.map(assignment => {
    return dropdownMenuState[assignment._id] = false
  })

  return dropdownMenuState
}

class AssignmentList extends Component {
  state = {
    showDropdown: initializeDropdownMenuState(this.props.assignments),
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

  render() {
    const { assignments } = this.props

    return (
      <div className={ styles.mainContainer }>
        <div className={ styles.contentContainer }>
          <div className={ styles.assignmentsContainer }>
            <div className={ styles.headerContainer }>
              <h2>Your Assignments</h2>
            </div>
            <AssignmentTable
              fields={ assignmentTableFields }
              assignments={ assignments }
              name='allAssignments'
              dropdownVisible={ this.state.showDropdown }
              handleOpenDropdown={ this.openDropdown }
              setDropdownMenu={ this.setDropdownMenu }
            />
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
      assignments.push(assignment)
    })
  })

  return {
    assignments
  }
}

export default connect(mapStateToProps)(AssignmentList)
