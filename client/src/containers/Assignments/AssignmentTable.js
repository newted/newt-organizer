import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import moment from "moment";
// Components
import Dropdown from "../../components/Dropdown";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
// API
import {
  deleteAssignment,
  markAssignmentAsComplete,
  markAssignmentAsInProgress,
  markAssignmentAsIncomplete
} from "../../actions/assignments";
// Styling
import styles from "./AssignmentTable.module.css";
import { FiMoreVertical } from "react-icons/fi";
import { StatusIcon } from "../../utils/icons";

class AssignmentTable extends Component {
  static propTypes = {
    assignments: PropTypes.arrayOf(PropTypes.object).isRequired,
    deleteAssignment: PropTypes.func.isRequired,
    dropdownVisible: PropTypes.objectOf(PropTypes.bool).isRequired,
    fields: PropTypes.object.isRequired,
    handleOpenDropdown: PropTypes.func.isRequired,
    name: PropTypes.string,
    showCompleted: PropTypes.bool,
    history: PropTypes.object
  };

  state = {
    showModal: false,
    currentCourse: null,
    currentAssignment: null
  };

  openModal = (courseId, assignmentId) => {
    this.setState({
      showModal: true,
      currentCourse: courseId,
      currentAssignment: assignmentId
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      currentAssignment: null
    });
  };

  // Deleting assignment
  delete = async (courseId, assignmentId) => {
    const { history, deleteAssignment } = this.props;

    await deleteAssignment(courseId, assignmentId, history);

    this.setState({
      showModal: false,
      currentAssignment: null
    });
  };

  renderTableHeader() {
    const { fields } = this.props;

    return _.map(Object.keys(fields), label => (
      <th
        className={label === "Status" ? styles.center : null}
        style={{ width: fields[label].width }}
        key={label}
      >
        {label}
      </th>
    ));
  }

  // Render each data cell in the table in the format based on its type.
  renderTableCell(name, object) {
    switch (name) {
      case "status":
        return StatusIcon(object.completed, object.inProgress);
      case "dateDue":
        return object[name] && moment(object[name]).format("ddd, MMM Do");
      default:
        return object[name];
    }
  }

  renderTableBody() {
    const { fields, showCompleted, history } = this.props;

    let assignments = this.props.assignments;

    // If showCompleted is false, then remove all assignments that are marked
    // as complete before rendering.
    // Show completed can be undefined. Thus explicitly checking if false.
    if (showCompleted === false) {
      assignments = assignments.filter(
        assignment => assignment.completed !== true
      );
    }

    return _.map(assignments, object => {
      return (
        // A table row for each object (assignment, etc.)
        <tr key={object._id}>
          {_.map(Object.keys(fields), label => {
            // Getting the object key so that info can be accessed
            const name = fields[label].name || fields[label];

            // Add data to each cell
            return (
              <td
                className={name === "status" ? styles.center : null}
                key={object._id + name}
              >
                {this.renderTableCell(name, object)}
              </td>
            );
          })}
          {/* Options icon */}
          <td className={styles.options}>
            <Dropdown
              visible={this.props.dropdownVisible[object._id]}
              handleOpen={event =>
                this.props.handleOpenDropdown(object._id, event)
              }
            >
              <FiMoreVertical />
              <Dropdown.Menu>
                <Dropdown.Item
                  onClick={() =>
                    this.props.markAssignmentAsIncomplete(
                      object.courseId,
                      object._id,
                      history
                    )
                  }
                >
                  Mark as Incomplete
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    this.props.markAssignmentAsInProgress(
                      object.courseId,
                      object._id,
                      history
                    )
                  }
                >
                  Mark as In Progress
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() =>
                    this.props.markAssignmentAsComplete(
                      object.courseId,
                      object._id,
                      history
                    )
                  }
                >
                  Mark as Complete
                </Dropdown.Item>
                <Dropdown.Item />
                <Dropdown.Item
                  onClick={() =>
                    history.push(
                      `/courses/${object.courseId}/assignments/${
                        object._id
                      }/edit`
                    )
                  }
                >
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={() => this.openModal(object.courseId, object._id)}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </td>
        </tr>
      );
    });
  }

  render() {
    const { assignments, name } = this.props;

    return (
      <div className={styles.container}>
        {assignments.length === 0 ? (
          <div>{`There are no ${name}.`}</div>
        ) : (
          <table>
            <thead>
              <tr>{this.renderTableHeader()}</tr>
            </thead>
            <tbody>{this.renderTableBody()}</tbody>
          </table>
        )}
        <Modal showModal={this.state.showModal} handleClose={this.closeModal}>
          <Modal.Body>
            Are you sure you want to delete this assignment?
          </Modal.Body>
          <Modal.Footer>
            <Button
              category="danger"
              onClick={() =>
                this.delete(
                  this.state.currentCourse,
                  this.state.currentAssignment
                )
              }
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

function mapStateToProps(state, { assignments, fields, name, showCompleted }) {
  return {
    assignments,
    fields,
    name,
    showCompleted
  };
}

const mapDispatchToProps = {
  deleteAssignment,
  markAssignmentAsComplete,
  markAssignmentAsInProgress,
  markAssignmentAsIncomplete
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(AssignmentTable));
