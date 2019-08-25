import React from "react";
// Components
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const QuizModal = ({ show, handleCloseModal }) => (
  <Modal show={show} onHide={handleCloseModal} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>Quiz</Modal.Title>
    </Modal.Header>
    <Modal.Body>Quiz questions</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleCloseModal}>
        Close
      </Button>
      <Button variant="primary" onClick={() => alert("working on this!")}>
        Submit
      </Button>
    </Modal.Footer>
  </Modal>
);

export default QuizModal;
