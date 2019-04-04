import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import LoadingBar from "react-redux-loading";
import programFields from "./programFields";
// API
import { updateProgram } from "../../actions/programs";
// Components
import Form from "../../components/Form";
// Styling
import styles from "./EditProgram.module.css";

class EditProgram extends Component {
  static propTypes = {
    program: PropTypes.shape({
      courses: PropTypes.array,
      dateCreated: PropTypes.string,
      institution: PropTypes.string,
      name: PropTypes.string,
      shortname: PropTypes.string,
      _id: PropTypes.string,
      _user: PropTypes.string
    }),
    updateProgram: PropTypes.func.isRequired,
    // Connect props
    history: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object
  };

  render() {
    if (!this.props.program) {
      return <LoadingBar />;
    }

    const { _id, name, shortname, institution } = this.props.program;
    const initialValues = {
      name,
      shortname,
      institution
    };

    return (
      <div className={styles.mainContainer}>
        <div className={styles.headerContainer}>
          <h3>Edit Program</h3>
        </div>
        <Form
          formName="EditProgramForm"
          formFields={programFields}
          initialValues={initialValues}
          onSubmit={values =>
            this.props.updateProgram(_id, values, this.props.history)
          }
        />
      </div>
    );
  }
}

function mapStateToProps({ programs }, props) {
  const { programId } = props.match.params;
  const program = _.filter(
    programs.items,
    program => program._id === programId
  )[0];

  return {
    program
  };
}

const mapDispatchToProps = {
  updateProgram
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditProgram);
