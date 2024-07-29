import axios from "axios";
import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const EditTodo = ({ item }) => {
  const [show, setShow] = useState(false);
  const [description, setDescriptions] = useState(item.description);

  const editHandler = (e) => {
    const body = { description };
    axios
      .put(
        `http://localhost:5000/todos/${item.todo_id}`,
        { description },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log(res.data);
        setShow(false);
        window.location = "/";
      });
  };
  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => setShow(true);
  return (
    <>
      <Button variant="warning" onClick={handleShow} className="text-white">
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => {
              setDescriptions(e.target.value);
            }}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            className="text-white"
            onClick={editHandler}
          >
            Edit
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditTodo;
