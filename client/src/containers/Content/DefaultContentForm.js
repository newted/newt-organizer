import React from "react";
import _ from "lodash";
// Components
import Button from "../../components/Button";
import DatePicker from "react-datepicker";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { defaultContentSchema } from "./contentSchemas";
// Styling
import styles from "./AddContent.module.css";

const initialFormValues = { name: "", description: "", dateDue: "" };

const DefaultContentForm = ({
  type = "submit",
  initialValues = initialFormValues,
  onFormSubmit
}) => (
  <Formik
    validationSchema={defaultContentSchema}
    initialValues={initialValues}
    onSubmit={values => onFormSubmit(values)}
  >
    {({
      handleSubmit,
      handleChange,
      handleBlur,
      values,
      errors,
      setFieldValue
    }) => (
      <Form
        noValidate
        onSubmit={handleSubmit}
        className={type === "edit" ? styles.form : ""}
      >
        <Form.Group controlId="contentName">
          <Form.Label className={styles.formLabel}>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="contentDesc">
          <Form.Label className={styles.formLabel}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <div>Description</div>
              <span className={styles.optional}>Optional</span>
            </div>
          </Form.Label>
          <Form.Control
            as="textarea"
            rows="3"
            type="text"
            name="description"
            value={values.description}
            onChange={handleChange}
            onBlur={handleBlur}
          />
        </Form.Group>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Form.Label className={styles.formLabel}>Due Date</Form.Label>
          <DatePicker
            name="dateDue"
            value={values.dateDue}
            selected={values.dateDue}
            onChange={date => setFieldValue("dateDue", date)}
            dateFormat="MMM d, yyyy h:mm aa"
            placeholderText="Select date"
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
          />
          <Form.Control.Feedback type="invalid">
            {errors.dateDue}
          </Form.Control.Feedback>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            category="primary"
            type="submit"
            style={{ width: "300px", marginTop: "2.5rem" }}
          >
            {_.capitalize(type)}
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default DefaultContentForm;
