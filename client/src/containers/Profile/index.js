import React, { Component } from "react";
import { connect } from "react-redux";
// API
import { updateUser } from "../../actions/authedUser";
// Components
import PersonalInfoTab from "./PersonalInfoTab";
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

  renderContent() {
    switch (this.state.activeTab) {
      case "Personal Information":
        return (
          <PersonalInfoTab
            userInfo={this.props.userInfo}
            onSubmit={this.props.updateUser}
          />
        );
      case "Statistics":
        return <div>[Statistics Content]</div>;
      default:
        return null;
    }
  }

  render() {
    return (
      <div className={styles.mainContainer}>
        <h2 className={styles.headerContainer}>Profile</h2>
        <div className={styles.container}>
          <div className={styles.optionsContainer}>
            <h2 className={styles.subheading}>Account</h2>
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
          <div className={styles.contentContainer}>
            <h3 className={styles.contentHeader}>{this.state.activeTab}</h3>
            {this.renderContent()}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth: { item } }) {
  const userInfo = item;

  return { userInfo };
}

const mapDispatchToProps = { updateUser };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
