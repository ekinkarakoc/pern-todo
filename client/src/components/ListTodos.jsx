import React, { useEffect, useState } from "react";
import axios from "axios";
import EditTodo from "./EditTodo";

const ListTodos = () => {
  const [todoList, setTodoList] = useState([]);

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/todos/${id}`).then((res) => {
      console.log(res.data);
      setTodoList(
        todoList.filter((item) => {
          item.id !== id;
        })
      );
    });
  };

  const getTodos = () => {
    axios.get("http://localhost:5000/todos").then((res) => {
      setTodoList(res.data);
    });
  };

  useEffect(() => {
    getTodos();
  }, [todoList]);
  return (
    <>
      <div className="col-10 m-auto">
        <table className="table mt-5">
          <thead>
            <tr className="text-center">
              <th scope="col" className="text-start">
                Description
              </th>
              <th scope="col" className="text-center">
                Edit
              </th>
              <th scope="col" className="text-center">
                Delete
              </th>
            </tr>
          </thead>
          <tbody>
            {/* <tr>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr> */}
            {todoList.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="col-10 text-start">{item.description}</td>
                  <td className="col-1 text-center">
                    <EditTodo />
                  </td>
                  <td className="col-1 text-center">
                    <button
                      className="btn btn-danger"
                      onClick={() => {
                        handleDelete(item.todo_id);
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListTodos;
