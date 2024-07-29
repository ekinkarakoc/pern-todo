import React, { useState } from "react";
import axios from "axios";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const body = { description };
    axios
      .post("http://localhost:5000/todos", body, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res.data);
        setDescription("");
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <>
      <h1 className="text-center mt-5">Pern Input Todo</h1>
      <form className="d-flex mt-5">
        <input
          type="text"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button className="btn btn-success" onClick={onSubmit}>
          Add
        </button>
      </form>
    </>
  );
};

export default InputTodo;
