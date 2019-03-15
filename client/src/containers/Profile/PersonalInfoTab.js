import React, { Component } from "react";
import { reduxForm, Form, Field as ReduxField } from "redux-form";
// Components
import Field from "../../components/Field";
import Button from "../../components/Button";
// Styling
import styles from "./PersonalInfoTab.module.css";

class PersonalInfoTab extends Component {
  render() {
    return (
      <div>
        <Form
          className={styles.form}
          onSubmit={this.props.handleSubmit(values => console.log(values))}
        >
          <ReduxField
            component={Field}
            type="text"
            name="firstName"
            label="First Name"
            required={true}
          />
          <ReduxField
            component={Field}
            type="text"
            name="lastName"
            label="Last Name"
            required={true}
          />
          <Button additionalClass={styles.submitBtn} type="submit">
            Save
          </Button>
        </Form>
      </div>
    );
  }
}

export default reduxForm({
  form: "personalInfoForm"
})(PersonalInfoTab);
