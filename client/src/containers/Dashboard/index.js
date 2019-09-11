import React, { Component } from "react";
import PropTypes from "prop-types";
// Components
// import Loader from "../../components/Loader";
// import Timeline from "./Timeline";
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
    return <div className={styles.message}>Under construction</div>;
  }

  render() {
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

export default Dashboard;
