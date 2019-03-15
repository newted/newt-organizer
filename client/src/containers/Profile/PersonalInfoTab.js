import React, { Component } from "react";
import { reduxForm, Form, Field as ReduxField } from "redux-form";
import _ from "lodash";
import infoFields from "./infoFields";
// Components
import Field from "../../components/Field";
import Button from "../../components/Button";
// Styling
import styles from "./PersonalInfoTab.module.css";

const PersonalInfoTab = ({ userInfo }) => {
  class PersonalInfoForm extends Component {
    renderFields() {
      return _.map(infoFields, ({ name, label, required }) => (
        <ReduxField
          component={Field}
          type="text"
          name={name}
          label={label}
          required={required}
          key={name}
        />
      ));
    }

    render() {
      return (
        <div>
          <Form
            className={styles.form}
            onSubmit={this.props.handleSubmit(values => console.log(values))}
          >
            {this.renderFields()}
            <Button additionalClass={styles.submitBtn} type="submit">
              Save
            </Button>
          </Form>
        </div>
      );
    }
  }

  // Input validation function
  function validate(values) {
    const errors = {};

    _.each(infoFields, ({ name, required }) => {
      if (required && !values[name]) {
        errors[name] = "You must provide a value.";
      }
    });

    return errors;
  }

  PersonalInfoForm = reduxForm({
    validate,
    initialValues: {
      firstName: userInfo.name.givenName,
      lastName: userInfo.name.familyName
    },
    form: "personalInfoForm"
  })(PersonalInfoForm);

  return <PersonalInfoForm />;
};

export default PersonalInfoTab;
