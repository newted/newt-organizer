import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withToastManager } from "react-toast-notifications";
// API
import { fetchPrograms, resolvePrograms } from "../../actions/programs";
// Components
import ToastContent from "../../components/CustomToast/ToastContent";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
// Styling
import styles from "./ProgramList.module.css";
import { UniversityIcon } from "../../utils/icons";

class ProgramList extends Component {
  static propTypes = {
    programs: PropTypes.shape({
      items: PropTypes.object
    }),
    fetchPrograms: PropTypes.func,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  // Variable to keep track of notification ids
  toastId = null;

  componentDidUpdate() {
    const { toastManager, resolvePrograms } = this.props;
    const { error } = this.props.programs;

    if (error) {
      toastManager.add(
        <ToastContent
          message="Something went wrong, could not fetch programs."
          error={error}
          onRetry={this.onRetry}
        />,
        {
          appearance: "error",
          autoDismiss: true,
          pauseOnHover: true
        },
        // Callback to assign id to variable after adding.
        id => (this.toastId = id)
      );
      resolvePrograms();
    }
  }

  // Function to run when retry button is clicked.
  onRetry = () => {
    const { fetchPrograms, toastManager } = this.props;

    // A request is made to fetch programs. Then the toast is removed so that it
    // no longer displays on the screen.
    fetchPrograms();
    toastManager.remove(this.toastId);
  };

  renderCards() {
    const { programs } = this.props;

    return _.map(programs.items, ({ _id, name, shortname, institution }) => {
      return (
        <Card
          path={`/programs/${_id}`}
          title={name}
          subtitle={institution}
          icon={UniversityIcon}
          additionalClass={styles.cardColor}
          key={_id}
        />
      );
    });
  }

  renderNoContent() {
    return (
      <div className={styles.message}>
        There are no programs to display. To add a program, click on the{" "}
        <span className={styles.addProgram}>Add Program</span> button.
      </div>
    );
  }

  render() {
    const { isFetching, items } = this.props.programs;
    // Display loader if the items are fetching
    if (isFetching && _.isEmpty(items)) {
      return <Loader />;
    }

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h2>Programs</h2>
          <Link to="/programs/new">
            <Button category="success">Add Program</Button>
          </Link>
        </div>
        <div className={styles.cardContainer}>
          {!_.isEmpty(this.props.programs.items)
            ? this.renderCards()
            : this.renderNoContent()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ programs }) {
  return {
    programs
  };
}

const mapDispatchToProps = {
  fetchPrograms,
  resolvePrograms
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withToastManager(ProgramList));
