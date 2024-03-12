import { ChangeEvent, FormEvent, useState } from "react";
import "./App.css";
import Input from "@mui/joy/Input";
import { v4 as uuidv4 } from "uuid";
import Button from "@mui/joy/Button";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);

  type Todo = {
    id: string;
    inputValue: string;
    checked: boolean;
    date: Date;
  };

  // function handleChange(e: ChangeEvent<HTMLInputElement>) {
  //   e.preventDefault();
  //   setInputText(e.target.value);
  // }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!inputText) return;

    const newTodo: Todo = {
      id: uuidv4(),
      inputValue: inputText,
      checked: false,
      date: new Date(),
    };

    setTodos([...todos, newTodo]);
    // setInputText(inputText);
    setInputText("");
  }

  //Edit a task
  function handleEdit(id: string, inputValue: string) {
    const todosCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = todosCopy.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  //Check a task
  function handleChecked(id: string) {
    const todosCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = todosCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !todo.checked;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  // Delete a task
  function handleDelete(id: string) {
    const todosCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = todosCopy.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }
  console.log(todos);

  return (
    <div className="App">
      <div style={{ width: "50%" }}>
        <h1>Todo list</h1>
        {/* <form onSubmit={handleSubmit}> */}
        <form onSubmit={(e) => handleSubmit(e)}>
          <Input
            onChange={(e) => setInputText(e.target.value)}
            color="neutral"
            size="sm"
            variant="soft"
            // className="inputText"
            value={inputText}
          />
          {/*<input
          type="text"
          onChange={(e) => setInputText(e.target.value)}
          value={inputText}
          // onChange={(e) => handleChange(e)}
          className="inputText"
        />
         <Button
          color="primary"
          onClick={function () {}}
          size="lg"
          variant="solid"
        >
          + Add
</Button> 
<Button type="submit" size="lg" variant="solid" color="primary"> + Add</Button> */}
          <Input type="submit" value="+ Add" className="submitButton" />
        </form>

        <div className="list-container">
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <Input
                  // type="text"
                  color="neutral"
                  size="sm"
                  variant="soft"
                  value={todo.inputValue}
                  onChange={(e) => handleEdit(todo.id, e.target.value)}
                />
                <input
                  type="checkbox"
                  onChange={() => handleChecked(todo.id)}
                />
                // <Button
                //   startDecorator={<DeleteOutlineIcon />}
                //   size="sm"
                //   className="button"
                //   onClick={() => handleDelete(todo.id)}
                // />
                <IconButton aria-label="delete" onClick={() => handleDelete(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
