import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
// Components
import Button from "../../components/Button";
// API
import { createYoutubeAssignment } from "../../actions/assignments";
// Styling
import styles from "./AddAssignmentConfirmation.module.css";

class AddAssignmentConfirmation extends Component {
  state = {
    values: {
      name: this.props.videoInfo.videoData.snippet.title,
      details: this.props.videoInfo.videoData.snippet.description,
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

  // Lists fields that are required. Used when updating errors based on null/
  // empty values. If it's not required then no need to create that error.
  _requiredFields = ["name", "dateDue"];

  // Specific handler for the Datepicker (because it does not use name - or that
  // does not seem to work)
  handleDatepickerChange = date => {
    this.setState(prevState => ({
      ...prevState,
      values: {
        ...prevState.values,
        dateDue: date
      }
    }));
  };

  // Update state based on input changes
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

  // Update touched and error properties when input field is clicked.
  handleBlur = (e, fieldName) => {
    const name = fieldName || e.target.name;

    // Update touched property in state
    this.setState(prevState => ({
      ...prevState,
      touched: {
        ...prevState.touched,
        [name]: true
      }
    }));

    // If the field is required and the values are empty or null, set the error
    // property for that field to true. Otherwise set it as false.
    if (
      (this._requiredFields.includes(name) &&
        this.state.values[name] === null) ||
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

  // This is some real wack validation but it seems to work and I'm too lazy to
  // redo.
  // First check if the required fields are empty. If they are, then set that
  // field's touched and empty property to true so that the error message can
  // pop up. Return false if there is even 1 time where this occurs. Only return
  // true if there are no null/empty values for the required fields.
  validate = () => {
    let count = 0;
    this._requiredFields.forEach(fieldName => {
      if (
        this.state.values[fieldName] === null ||
        this.state.values[fieldName].length === 0
      ) {
        count += 1;
        this.setState(prevState => ({
          ...prevState,
          touched: {
            ...prevState.touched,
            [fieldName]: true
          },
          errors: {
            ...prevState.errors,
            [fieldName]: true
          }
        }));
      }
    });

    if (count > 0) {
      return false;
    }

    return true;
  };

  // Sends the create request if the validation requirements are met. If not,
  // the field error messages will pop up through the validation function,
  // hinting at the missing fields.
  handleConfirmation = () => {
    const isValidated = this.validate();

    if (isValidated) {
      const { values } = this.state;
      const {
        courseId,
        videoInfo: {
          videoData,
          hasKnowledgeTracking,
          hasQuiz,
          contentInfo,
          knowledgeSubject,
          knowledgeModule
        },
        createYoutubeAssignment,
        history
      } = this.props;

      let info = {
        hasKnowledgeTracking,
        hasQuiz,
        contentInfo,
        knowledgeSubject,
        knowledgeModule,
        videoInfo: {
          videoId: videoData.id,
          channelId: videoData.snippet.channelId,
          datePublished: videoData.snippet.publishedAt,
          thumbnails: {
            maxres: {
              url: videoData.snippet.thumbnails.maxres.url,
              width: videoData.snippet.thumbnails.maxres.width,
              height: videoData.snippet.thumbnails.maxres.height
            }
          }
        }
      };

      createYoutubeAssignment(courseId, values, info, history);
    } else {
      console.log("All fields have not been completed");
    }
  };

  render() {
    const {
      videoInfo: { videoData, hasKnowledgeTracking },
      handleGoBackToForm
    } = this.props;

    return (
      <div className={styles.container}>
        <div className={styles.videoPreview}>
          <img
            src={videoData.snippet.thumbnails.maxres.url}
            height={videoData.snippet.thumbnails.medium.height}
            width={videoData.snippet.thumbnails.medium.width}
            alt={videoData.snippet.title}
          />
          <form className={styles.formContainer}>
            <div className={styles.formRow}>
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
              <div className={`${styles.inputGroup} ${styles.inputGroupRight}`}>
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
            <div className={styles.formRow}>
              <div className={`${styles.inputGroup} ${styles.inputGroupLeft}`}>
                <div>
                  <label style={{ marginRight: ".5rem" }}>Details</label>
                  <span className={styles.optional}>Optional</span>
                </div>
                <textarea
                  name="details"
                  type="text"
                  rows={4}
                  value={this.state.values.details}
                  className={styles.input}
                  onChange={this.handleInputChange}
                  onBlur={this.handleBlur}
                />
              </div>
              <div className={`${styles.inputGroup} ${styles.inputGroupRight}`}>
                <label style={{ marginRight: ".5rem" }}>
                  Knowledge Tracking
                </label>
                <p
                  style={{ marginTop: "0.625rem", color: "var(--darkGrey-2)" }}
                >
                  {hasKnowledgeTracking ? "Yes" : "No"}
                </p>
              </div>
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
            onClick={this.handleConfirmation}
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

const mapDispatchToProps = {
  createYoutubeAssignment
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(AddAssignmentConfirmation));
