import React from "react";
// Components
import Button from "../../components/Button";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
// Styling
import styles from "./AddContent.module.css";

const BookContentForm = ({
  onSubmit,
  initialValues = { title: "", author: "" },
  direction = "vertical"
}) => (
  <Formik
    initialValues={initialValues}
    enableReinitialize
    onSubmit={values => onSubmit(values)}
    direction={direction}
  >
    {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
      <Form
        noValidate
        onSubmit={handleSubmit}
        className={direction === "horizontal" ? styles.horizontalForm : null}
      >
        <Form.Group
          className={
            direction === "horizontal" ? styles.horizontalFormGroup : null
          }
          controlId="title"
        >
          <Form.Label className={styles.formLabel}>Title</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={values.title}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.title}
          />
          <Form.Control.Feedback type="invalid">
            {errors.title}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group
          className={
            direction === "horizontal" ? styles.horizontalFormGroup : null
          }
          controlId="author"
        >
          <Form.Label className={styles.formLabel}>Author</Form.Label>
          <Form.Control
            type="text"
            name="author"
            value={values.author}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.author}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author}
          </Form.Control.Feedback>
        </Form.Group>
        <div
          className={
            direction === "horizontal"
              ? styles.searchButtonContainerHorizontal
              : styles.searchButtonContainer
          }
        >
          <Button
            category="primary"
            type="submit"
            additionalClass={
              direction === "horizontal"
                ? styles.searchButtonHorizontal
                : styles.searchButton
            }
          >
            Search
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default BookContentForm;
