import React from "react";
import _ from "lodash";
import Modal from "react-bootstrap/Modal";
import Button from "../../components/Button";

const DeleteItemModal = ({ show, onHide, itemToDelete = "item", onDelete }) => (
  <Modal show={show} onHide={onHide}>
    <Modal.Header closeButton>
      <Modal.Title>Delete {_.capitalize(itemToDelete)}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      Are you sure you want to delete this {itemToDelete}?
    </Modal.Body>
    <Modal.Footer>
      <Button onClick={onHide}>Close</Button>
      <Button category="danger" onClick={onDelete}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default DeleteItemModal;
