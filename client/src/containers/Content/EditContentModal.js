import React from "react";
import Modal from "react-bootstrap/Modal";
import DefaultContentForm from "./DefaultContentForm";
import styles from "./EditContentModal.module.css";

const EditContentModal = ({ show, onHide, content, onFormSubmit }) => (
  <Modal show={show} onHide={onHide} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Edit {content.name}</Modal.Title>
    </Modal.Header>
    <Modal.Body className={styles.modalBody}>
      <DefaultContentForm
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
