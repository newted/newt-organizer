import React, { Component, Fragment } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withToastManager } from "react-toast-notifications";
// API
import { deleteProgram } from "../../actions/programs";
import { fetchCourses, resolveCourses } from "../../actions/courses";
// Components
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import Loader from "../../components/Loader";
import ProgramCourseList from "../Courses/ProgramCourseList";
// Helpers
import { displayErrorNotification } from "../../components/CustomToast/errorNotification";
// Styling
import styles from "./ProgramPage.module.css";

class ProgramPage extends Component {
  static propTypes = {
    program: PropTypes.shape({
      courses: PropTypes.array,
      dateCreated: PropTypes.string,
      institution: PropTypes.string,
      name: PropTypes.string,
      shortname: PropTypes.string,
      _id: PropTypes.string,
      _user: PropTypes.string
    }),
    deleteProgram: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  state = {
    showModal: false
  };

  // Variable to keep track of notification ids
  toastId = null;

  componentDidUpdate() {
    const { toastManager, resolveCourses, courseError } = this.props;

    if (courseError.message && courseError.source) {
      switch (courseError.source) {
        case "fetch":
          const callback = id => (this.toastId = id);
          // Display error notification
          displayErrorNotification(
            toastManager,
            "fetch",
            "course",
            courseError.message,
            this.onRetry,
            callback
          );
          break;
        case "create":
        case "delete":
          displayErrorNotification(
            toastManager,
            courseError.source,
            "course",
            courseError.message
          );
          break;
        default:
          return;
      }

      resolveCourses();
    }
  }

  onRetry = () => {
    const { programId, fetchCourses, toastManager } = this.props;

    // A request is made to fetch courses. Then the toast is removed so that it
    // no longer displays on the screen.
    fetchCourses(programId);
    toastManager.remove(this.toastId);
  };

  openModal = () => {
    this.setState({ showModal: true });
  };

  closeModal = () => {
    this.setState({ showModal: false });
  };

  renderContent() {
    const { program, history, deleteProgram } = this.props;

    return (
      <Fragment>
        <div className={styles.headerContainer}>
          <div className={styles.headings}>
            <h2 className={styles.header}>{this.props.program.name}</h2>
            <h2 className={styles.institution}>
              {this.props.program.institution}
            </h2>
          </div>
          <div>
            <Link to={{ pathname: `/programs/${this.props.program._id}/edit` }}>
              <Button category="primary" additionalClass={styles.leftBtn}>
                Edit
              </Button>
            </Link>
            <Button
              category="danger"
              additionalClass={styles.rightBtn}
              onClick={this.openModal}
            >
              Delete
            </Button>
            <Modal
              showModal={this.state.showModal}
              handleClose={this.closeModal}
            >
              <Modal.Body>
                Are you sure you want to delete this program?
              </Modal.Body>
              <Modal.Footer>
                <Button
                  category="danger"
                  onClick={() => deleteProgram(program._id, history)}
                >
                  Delete
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </div>
        <ProgramCourseList programId={program._id} />
      </Fragment>
    );
  }

  render() {
    const { program } = this.props;
    if (!program) {
      return <Loader />;
    }

    return <div className={styles.mainContainer}>{this.renderContent()}</div>;
  }
}

function mapStateToProps({ programs, courses }, props) {
  const { programId } = props.match.params;
  const program = _.filter(
    programs.items,
    program => program._id === programId
  )[0];
  const courseError = courses.error;

  return {
    program,
    programId,
    courseError
  };
}

const mapDispatchToProps = {
  deleteProgram,
  fetchCourses,
  resolveCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(ProgramPage));
