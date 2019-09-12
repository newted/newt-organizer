import React from "react";
import * as yup from "yup";
// Components
import Button from "../../components/Button";
import { Formik } from "formik";
import Form from "react-bootstrap/Form";
// Styling
import styles from "./AddContent.module.css";

const youtubeContentSchema = yup.object({
  url: yup
    .string()
    .url(
      "Make sure it's a URL. E.g.: https://www.youtube.com/watch?v=LN0ucKNX0hc"
    )
    .required("A YouTube URL is required")
});

const YoutubeContentForm = () => (
  <Formik
    validationSchema={youtubeContentSchema}
    initialValues={{ url: "" }}
    onSubmit={values => console.log(values)}
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
