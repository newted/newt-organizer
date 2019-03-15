import React, { Component } from "react";
// Styling
import styles from "./Profile.module.css";

class Profile extends Component {
  state = {
    activeTab: "Personal Information"
  };

  renderOptionClass(optionTitle) {
    return this.state.activeTab === optionTitle
      ? `${styles.option} ${styles.active}`
      : styles.option;
  }

  handleTabChange = e => {
    const tab = e.target.innerHTML;

    this.setState(() => ({
      activeTab: tab
    }));
  };

  render() {
    return (
      <div className={styles.mainContainer}>
        <h2 className={styles.headerContainer}>Profile</h2>
        <div className={styles.container}>
          <div className={styles.optionsContainer}>
            <h3 className={styles.subheading}>Account</h3>
            <div
              className={this.renderOptionClass("Personal Information")}
              onClick={e => this.handleTabChange(e)}
            >
              Personal Information
            </div>
            <div
              className={this.renderOptionClass("Statistics")}
              onClick={e => this.handleTabChange(e)}
            >
              Statistics
            </div>
          </div>
          <div className={styles.contentContainer} />
        </div>
      </div>
    );
  }
}

export default Profile;
