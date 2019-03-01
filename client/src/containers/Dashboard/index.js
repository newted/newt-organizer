import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Components
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

  componentDidMount() {
    this.props.fetchAllCourses(Object.keys(this.props.programs.items));
  }

  renderContent() {
    const programLink = (
      <Link to="/programs" className={styles.link}>
        Programs
      </Link>
    );

    if (Object.keys(this.props.programs.items).length > 0) {
      return <Timeline />;
    } else {
      return (
        <div className={styles.message}>
          You aren't in any programs. Go to the {programLink} page from the
          sidebar to create a Program.
        </div>
      );
    }
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.contentContainer}>
          <h2 className={styles.header}>Dashboard</h2>
          {this.renderContent()}
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
  fetchAllCourses
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);
