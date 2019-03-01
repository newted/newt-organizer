import React, { Component } from "react";
import _ from "lodash";
import PropTypes from "prop-types";
import { reduxForm, Form, Field as ReduxField } from "redux-form";
import { withRouter } from "react-router-dom";
import LoadingBar from "react-redux-loading";
import programFields from "./programFields";
// Components
import Button from "../../components/Button";
import Field from "../../components/Field";
// Styling
import styles from "./EditProgramForm.module.css";

const EditProgramForm = ({ program, onSubmit }) => {
  if (!program) {
    return <LoadingBar />;
  }

  class EditProgramFormComponent extends Component {
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
      handleSubmit: PropTypes.func.isRequired,
      onSubmit: PropTypes.func.isRequired,
      history: PropTypes.object
    };

    renderFields() {
      return _.map(programFields, ({ label, name, required }) => {
        return (
          <ReduxField
            component={Field}
            type="text"
            label={label}
            name={name}
            required={required}
            key={name}
          />
        );
      });
    }

    render() {
      const { handleSubmit, onSubmit, history } = this.props;

      return (
        <div className={styles.formContainer}>
          <Form
            onSubmit={handleSubmit(values =>
              onSubmit(program._id, values, history)
            )}
          >
            {this.renderFields()}
            <Button type="submit" additionalClass={styles.updateBtn}>
              Update
            </Button>
          </Form>
        </div>
      );
    }
  }

  EditProgramFormComponent = reduxForm({
    form: "editProgramForm",
    initialValues: {
      name: program.name,
      shortname: program.shortname,
      institution: program.institution
    }
  })(withRouter(EditProgramFormComponent));

  return <EditProgramFormComponent program={program} onSubmit={onSubmit} />;
};

export default EditProgramForm;
