import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { withToastManager } from "react-toast-notifications";
// API
import { fetchPrograms, resolvePrograms } from "../../actions/programs";
// Components
import {
  MainContainer,
  HeaderContainer,
  ContentContainer
} from "../../components/Page/Containers";
import { PageHeader } from "../../components/Page/Headers";
import { MessageBox } from "../../components/Page/MessageBox";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Loader from "../../components/Loader";
// Helpers
import { displayErrorNotification } from "../../components/CustomToast/errorNotification";
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

    // Error handling: add error toast notification if there's any error with
    // data requests.
    if (error.message && error.requestType) {
      switch (error.requestType) {
        case "fetch":
          const callback = id => (this.toastId = id);
          // Display error notification
          displayErrorNotification(
            toastManager,
            "fetch",
            "program",
            error.message,
            this.onRetry,
            callback
          );
          break;
        case "create":
        case "update":
        case "delete":
          displayErrorNotification(
            toastManager,
            error.requestType,
            "program",
            error.message
          );
          break;
        default:
          return;
      }

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
      <MessageBox>
        There are no programs to display. To add a program, click on the{" "}
        <span className={styles.addProgram}>Add Program</span> button.
      </MessageBox>
    );
  }

  render() {
    const { isFetching, items } = this.props.programs;
    // Display loader if the items are fetching
    if (isFetching && _.isEmpty(items)) {
      return <Loader />;
    }

    return (
      <MainContainer>
        <HeaderContainer>
          <PageHeader>Programs</PageHeader>
          <Link to="/programs/new">
            <Button category="success">Add Program</Button>
          </Link>
        </HeaderContainer>
        <ContentContainer className={styles.cardContainer}>
          {!_.isEmpty(this.props.programs.items)
            ? this.renderCards()
            : this.renderNoContent()}
        </ContentContainer>
      </MainContainer>
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
