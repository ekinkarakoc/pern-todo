import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import InputTodo from "./components/InputTodo";
import ListTodos from "./components/ListTodos";

function App() {
  return (
    <>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </>
  );
}

export default App;
