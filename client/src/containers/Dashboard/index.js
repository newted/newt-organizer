import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Components
import Loader from "../../components/Loader";
import Timeline from "./Timeline";
// API
import { fetchAllCourses } from "../../actions/courses";
// Styling
import styles from "./Dashboard.module.css";

class Dashboard extends Component {
  static propTypes = {
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  renderContent() {
    const { programs } = this.props;
    const programLink = (
      <Link to="/programs" className={styles.link}>
        Programs
      </Link>
    );

    if (_.isEmpty(programs.items)) {
      return (
        <div className={styles.message}>
          You aren't in any programs. Go to the {programLink} page from the
          sidebar to create a Program.
        </div>
      );
    }

    return <Timeline />;
  }

  render() {
    const { isFetching, items } = this.props.programs;
    if (isFetching && _.isEmpty(items)) {
      return <Loader />;
    }

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h2 className={styles.header}>Dashboard</h2>
        </div>
        {this.renderContent()}
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
  fetchAllCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
