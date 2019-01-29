import React, { Component } from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import moment from 'moment'
// Components
import Dropdown from '../../components/Dropdown'
import Modal from '../../components/Modal'
import Button from '../../components/Button'
// API
import { fetchPrograms }  from '../../actions/programs'
import { deleteAssignment } from '../../actions/assignments'
// Styling
import styles from './AssignmentTable.module.css'
import { FiMoreVertical } from 'react-icons/fi'
import { FaCircle } from 'react-icons/fa'

// Red, green or grey circle to indicate whether assignment is incomplete,
// complete, or in progress
const StatusIcon = (completed, inProgress) => {
  const size = 11

  if (inProgress) {
    return <FaCircle color='#ccc' size={ size } />
  }

  if (completed) {
    return <FaCircle color='#33ce57' size={ size } />
  } else {
    return <FaCircle color='#dc3545' size={ size } />
  }
}

class AssignmentTable extends Component {
  static propTypes = {
    data: PropTypes.shape({
      programId: PropTypes.string.isRequired,
      courseId: PropTypes.string.isRequired,
      assignments: PropTypes.arrayOf(PropTypes.object).isRequired
    }),
    deleteAssignment: PropTypes.func.isRequired,
    dropdownVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
    fields: PropTypes.object.isRequired,
    handleOpenDropdown: PropTypes.func.isRequired,
    name: PropTypes.string,
    setDropdownMenu: PropTypes.func.isRequired,
    history: PropTypes.object,
  }

  state = {
    showModal: false,
    currentAssignment: null
  }

  openModal = (assignmentId) => {
    this.setState({
      showModal: true,
      currentAssignment: assignmentId
    })
  }

  closeModal = () => {
    this.setState({
      showModal: false,
      currentAssignment: null
    })
  }

  // Deleting assignment
  delete = async (assignmentId) => {
    const {
      data: { programId, courseId },
      history,
      deleteAssignment,
      fetchPrograms
    } = this.props

    await deleteAssignment(programId, courseId, assignmentId, history)

    // Get new data after deleting assignment
    await fetchPrograms()

    this.setState({
      showModal: false,
      currentAssignment: null
    })
  }

  renderTableHeader() {
    const { fields } = this.props

    return _.map(Object.keys(fields), label => (
        <th
          className={ label === 'Status' ? styles.center : null }
          key={ label }
        >
          { label }
        </th>
      )
    )
  }

  // Render each data cell in the table in the format based on its type.
  renderTableCell(name, object) {
    switch(name) {
      case 'status':
        return StatusIcon(object.completed, object.inProgress)
      case 'dateDue':
        return object[name] && moment(object[name]).format('ddd, MMM Do')
      default:
        return object[name]
      }
  }

  renderTableBody() {
    const {
      data: { programId, courseId, assignments },
      fields,
      history
    } = this.props

    return _.map(assignments, object => {
      return (
        // A table row for each object (assignment, etc.)
        <tr key={ object._id }>
          {
            _.map(Object.keys(fields), label => {
              // Getting the object key so that info can be accessed
              const name = fields[label]

              // Add data to each cell
              return (
                <td
                  className={ name === 'status' ? styles.center : null }
                  key={ object._id + name }>
                  { this.renderTableCell(name, object) }
                </td>
              )
            })
          }
          {/* Options icon */}
          <td className={ styles.options }>
            <Dropdown
              visible={ this.props.dropdownVisible[object._id] }
              handleOpen={ (event) =>
                this.props.handleOpenDropdown(object._id, event)
              }
            >
              <FiMoreVertical />
              <Dropdown.Menu
                ref={ (element) => { this.props.setDropdownMenu(element) } }
              >
                <Dropdown.Item>Mark as In Progress</Dropdown.Item>
                <Dropdown.Item>Mark as Complete</Dropdown.Item>
                <Dropdown.Item></Dropdown.Item>
                <Dropdown.Item
                  onClick={ () =>
                    history.push(`/programs/${programId}/courses/${courseId}/assignments/${object._id}/edit`)
                  }
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={
                    () => this.openModal(object._id)
                  }
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      )
    })
  }

  render() {
    const { data: { assignments }, name } = this.props

    return (
      <div className={ styles.tableContainer }>
        { assignments.length === 0
          ? <div>{ `There are no ${name}.` }</div>
          : <table>
              <thead>
                <tr>
                  { this.renderTableHeader() }
                </tr>
              </thead>
              <tbody>
                { this.renderTableBody() }
              </tbody>
            </table>
        }
        <Modal
          showModal={ this.state.showModal }
          handleClose={ this.closeModal }
        >
          <Modal.Body>
            Are you sure you want to delete this assignment?
          </Modal.Body>
          <Modal.Footer>
            <Button
              type='button'
              additionalClass={ styles.deleteBtn }
              onClick={
                () => this.delete(this.state.currentAssignment)
              }
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

function mapStateToProps(state, { data, fields, name }) {
  return {
    data,
    fields,
    name
  }
}

const mapDispatchToProps = {
  deleteAssignment,
  fetchPrograms
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AssignmentTable))
