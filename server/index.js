const express = require("express");
const cors = require("cors");
const pool = require("./db");

const app = express();

//MIDDLEWARE
app.use(cors());
app.use(express.json());

// CREATE A TODO

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// GET ALL TODOS

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// GET A TODO

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const aTodo = await pool.query("SELECT * FROM todo where todo_id = $1", [
      id,
    ]);
    res.json(aTodo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// UPDATE A TODO

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.json("update was succesfull");
  } catch (error) {
    console.log(error.message);
  }
});

//DELETE A TODO

// app.delete("/todos/:id", async (req, res) => {
//   try {
//     const { id } = req.params;

//     const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
//       id,
//     ]);
//     res.json("Todo was deleted");
//   } catch (error) {
//     console.log(error.message);
//   }
// });

app.delete("/todos/:id", (req, res) => {
  const { id } = req.params;

  pool
    .query("DELETE FROM todo WHERE todo_id = $1", [id])
    .then(() => {
      res.json("Todo was deleted");
    })
    .catch((error) => {
      console.log(error.message);
      res
        .status(500)
        .json({ error: "An error occurred while deleting the todo" });
    });
});

//HOSTING
app.listen(5000, () => {
  console.log("server listining on port 5000");
});
