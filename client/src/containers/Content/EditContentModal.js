import React from "react";
import Modal from "react-bootstrap/Modal";
import ContentForm from "./ContentForm";
import styles from "./EditContentModal.module.css";

const EditContentModal = ({ show, onHide, content, onFormSubmit }) => (
  <Modal show={show} onHide={onHide} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Edit {content.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body className={styles.modalBody}>
      <ContentForm
        type="edit"
        initialValues={{
          name: content.name,
          description: content.description,
          dateDue: new Date(content.dateDue)
        }}
        onFormSubmit={onFormSubmit}
      />
    </Modal.Body>
  </Modal>
);

export default EditContentModal;
