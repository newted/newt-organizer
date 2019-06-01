import React, { Component } from "react";
import DatePicker from "react-datepicker";
// Components
import Button from "../../components/Button";
// Styling
import styles from "./AddAssignmentConfirmation.module.css";
import "react-datepicker/dist/react-datepicker-cssmodules.css";

class AddAssignmentConfirmation extends Component {
  state = {
    values: {
      name: this.props.videoInfo.snippet.title,
      details: this.props.videoInfo.snippet.description,
      dateDue: null
    },
    touched: {
      name: false,
      details: false,
      dateDue: false
    },
    errors: {
      name: false,
      details: false,
      dateDue: false
    }
  };

  handleDatepickerChange = date => {
    this.setState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        dateDue: date
      }
    }));
  };

  handleInputChange = e => {
    const name = e.target.name;
    const value = e.target.value;

    this.setState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        [name]: value
      }
    }));
  };

  handleBlur = (e, fieldName) => {
    const name = fieldName || e.target.name;
    const required = ["name", "dateDue"];

    this.setState(prevState => ({
      ...prevState,
      touched: {
        ...prevState.touched,
        [name]: true
      }
    }));

    if (
      (required.includes(name) && this.state.values[name] === null) ||
      this.state.values[name].length === 0
    ) {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: true
        }
      }));
    } else {
      this.setState(prevState => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          [name]: false
        }
      }));
    }
  };

  render() {
    const { videoInfo, handleGoBackToForm } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.videoPreview}>
          <img
            src={videoInfo.snippet.thumbnails.maxres.url}
            height={videoInfo.snippet.thumbnails.medium.height}
            width={videoInfo.snippet.thumbnails.medium.width}
            alt={videoInfo.snippet.title}
          />
          <form className={styles.formContainer}>
            <div className={styles.formRowOne}>
              <div className={`${styles.inputGroup} ${styles.inputGroupLeft}`}>
                <label>Name</label>
                <input
                  name="name"
                  type="text"
                  value={this.state.values.name}
                  className={styles.input}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur}
                />
                {this.state.touched.name && this.state.errors.name && (
                  <small className={styles.error}>
                    You must provide a value.
                  </small>
                )}
              </div>
              <div className={styles.inputGroup}>
                <label>Due Date</label>
                <DatePicker
                  name="dateDue"
                  dateFormat="MMM d, yyyy"
                  selected={this.state.values.dateDue}
                  placeholderText="Select date"
                  className={styles.input}
                  onChange={this.handleDatepickerChange}
                  onBlur={e => this.handleBlur(e, "dateDue")}
                />
                {this.state.touched.dateDue && this.state.errors.dateDue && (
                  <small className={styles.error}>
                    You must provide a value.
                  </small>
                )}
              </div>
            </div>
            <div className={styles.inputGroup} style={{ width: "70%" }}>
              <div>
                <label style={{ marginRight: ".5rem" }}>Details</label>
                <span className={styles.optional}>Optional</span>
              </div>
              <input
                name="details"
                type="text"
                value={this.state.values.details}
                className={styles.input}
                onChange={this.handleInputChange}
                onBlur={this.handleBlur}
              />
            </div>
          </form>
        </div>
        <div className={styles.actionButtonContainer}>
          <Button
            onClick={handleGoBackToForm}
            style={{ marginRight: "0.5rem", width: "125px" }}
          >
            Back
          </Button>
          <Button
            onClick={() => console.log(this.state.values)}
            category="primary"
            style={{ marginLeft: "0.5rem", width: "125px" }}
          >
            Confirm
          </Button>
        </div>
      </div>
    );
  }
}

export default AddAssignmentConfirmation;
