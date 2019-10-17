import React from "react";
// Components
import Modal from "react-bootstrap/Modal";
import Button from "../../components/Button";

const BookModal = ({ show, onHide, bookInfo }) => (
  <Modal show={show} onHide={onHide} size="lg">
    <Modal.Header closeButton>
      <Modal.Title>{`More Info for ${bookInfo.volumeInfo.title}`}</Modal.Title>
    </Modal.Header>
    <Modal.Body>{bookInfo.volumeInfo.description}</Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>Close</Button>
    </Modal.Footer>
  </Modal>
);

export default BookModal;
