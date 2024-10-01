import React, { useState } from "react";
import axios from "axios";
import { Button, Modal, Form } from "react-bootstrap";

const EditTodo = ({ todo, fetchTodo }) => {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState(todo.description);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // function that handles updating a todo description
  const handleSubmit = async () => {
    try {
      // update todo description
      await axios.put(
        `${process.env.REACT_APP_API_TODOS}/${todo._id}/description`,
        { description },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      // fetch todos
      fetchTodo();
      // close modal
      handleClose();
    } catch (error) {
      // handle error
      console.error("Failed to update todo ", error);
    }
  };

  return (
    <div className="edit-modal-container">
      <button onClick={handleShow} disabled={todo.completed}>
        Edit
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default EditTodo;
