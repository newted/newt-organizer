import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import programFields from "./programFields";
// Components
import Form from "../../components/Form";
// API
import { createProgram } from "../../actions/programs";
// Styling
import styles from "./AddProgram.module.css";

class AddProgram extends Component {
  static propTypes = {
    createProgram: PropTypes.func.isRequired,
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
        <Form
          formName="AddProgramForm"
          formFields={programFields}
          onSubmit={values =>
            this.props.createProgram(values, this.props.history)
          }
        />
      </div>
    );
  }
}

const mapDispatchToProps = {
  createProgram
};

export default connect(
  null,
  mapDispatchToProps
)(AddProgram);
