import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
// Components
import AddProgramForm from "./AddProgramForm";
// API
import { submitProgram } from "../../actions/programs";
// Styling
import styles from "./AddProgram.module.css";

class AddProgram extends Component {
  static propTypes = {
    submitProgram: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  render() {
    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h3>Add a New Program</h3>
        </div>
        <AddProgramForm onSubmit={this.props.submitProgram} />
      </div>
    );
  }
}

const mapDispatchToProps = {
  submitProgram
}

export default connect(
  null,
  mapDispatchToProps
)(AddProgram);
