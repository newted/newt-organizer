import React from "react";
// Components
import Button from "../../components/Button";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
import { youtubeContentSchema } from "./contentSchemas";
// Styling
import styles from "./AddContent.module.css";

const YoutubeContentForm = ({ onNext }) => (
  <Formik
    validationSchema={youtubeContentSchema}
    initialValues={{ url: "" }}
    onSubmit={values => onNext(values)}
  >
    {({ handleSubmit, handleChange, handleBlur, values, errors }) => (
      <Form noValidate onSubmit={handleSubmit}>
        <Form.Group controlId="youtubeUrl">
          <Form.Label className={styles.formLabel}>
            YouTube Video URL
          </Form.Label>
          <Form.Control
            type="text"
            name="url"
            value={values.url}
            onChange={handleChange}
            onBlur={handleBlur}
            isInvalid={!!errors.url}
          />
          <Form.Control.Feedback type="invalid">
            {errors.url}
          </Form.Control.Feedback>
        </Form.Group>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button
            category="primary"
            type="submit"
            style={{ width: "300px", marginTop: "2rem" }}
          >
            Next
          </Button>
        </div>
      </Form>
    )}
  </Formik>
);

export default YoutubeContentForm;
