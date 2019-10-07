import React from "react";
// Components
import Button from "../../components/Button";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
// Styling
import styles from "./AddContent.module.css";

const BookContentForm = ({ onSubmit }) => (
  <Formik
    initialValues={{ title: "", author: "" }}
    onSubmit={values => onSubmit(values)}
  >
    {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="title">
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
        <Form.Group controlId="author">
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
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            category="primary"
            type="submit"
            style={{ width: "300px", marginTop: "2rem" }}
          >
            Search
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default BookContentForm;
