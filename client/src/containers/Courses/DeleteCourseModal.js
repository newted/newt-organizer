import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "../../components/Button";

const DeleteCourseModal = ({ show, onHide, onDelete }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Delete Course</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete this course?</Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>Close</Button>
      <Button category="danger" onClick={onDelete}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteCourseModal;
