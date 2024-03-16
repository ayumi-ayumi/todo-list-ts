import { FormEvent, useState, useEffect, SetStateAction } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Input from "@mui/joy/Input";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import { pink } from "@mui/material/colors";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() =>
    JSON.parse(localStorage.getItem("TODOS") ?? "[]")
  );
  const [addToggle, setAddToggle] = useState<boolean>(false);
  const [tab, setTab] = useState<string>("all");

  type Todo = {
    id: string;
    inputValue: string;
    completed: boolean;
    isEditing: boolean;
    date: Date;
  };

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
    setAddToggle(false);
  }, [todos]);

  // Submit a todo task
  function handleSubmit(e: FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    setAddToggle(true);

    if (!inputText) return;

    const newTodo: Todo = {
      id: uuidv4(),
      inputValue: inputText,
      completed: false,
      isEditing: false,
      date: new Date(),
    };

    setTodos([...todos, newTodo]);
    setInputText("");
  }

  // Toggle an edit boolean
  function handleEditing(id: string): void {
    const todosCopy = todos.map((todo) => ({ ...todo }));
    setTodos(
      todosCopy.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEditing: !todo.isEditing };
        }
        return todo;
      })
    );
  }

  //Edit a task
  function handleEdit(id: string, inputValue: string): void {
    const todosCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = todosCopy.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  // Complete a task
  function handleCompleted(id: string): void {
    const todosCopy = todos.map((todo) => ({ ...todo }));
    setTodos(
      todosCopy.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
  }

  // Choose a filter tab
  function handleChange (_event: never, newValue: SetStateAction<string>): void {
    setTab(newValue);
  }

  // Filter todolist into "Completed" or "Active"
  function filterTodos(todos: Todo[], tab: string) {
    return todos.filter((todo) => {
      if (tab === "all") {
        return true;
      } else if (tab === "active") {
        return !todo.completed;
      } else if (tab === "completed") {
        return todo.completed;
      }
    });
  }

  const visibleTodos = filterTodos(todos, tab);

  // Delete a task
  function handleDelete(id: string): void {
    const todosCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = todosCopy.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div
        style={{
          width: "80%",
          backgroundColor: "#ffffff",
          paddingBottom: "20px",
        }}
      >
        <h1>Todo list</h1>
        <div className="input-container">
          <form onSubmit={(e) => handleSubmit(e)}>
            {addToggle && (
              <Input
                onChange={(e) => setInputText(e.target.value)}
                color="neutral"
                size="lg"
                variant="outlined"
                // className="inputText"
                value={inputText}
              />
            )}
            <Input
              type="submit"
              value="+ Add Task"
              color="primary"
              variant="solid"
              sx={{ width: "32%" }}
              className="submitButton"
            />
          </form>
          {visibleTodos.length ? (
            <Select
              color="neutral"
              placeholder="All"
              sx={{ width: "36%" }}
              variant="solid"
              onChange={handleChange}
            >
              <Option value="all">All</Option>
              <Option value="completed">Completed</Option>
              <Option value="active">Active</Option>
            </Select>
          ) : (
            <></>
          )}
        </div>

        {visibleTodos.length ? (
          <div className="list-container">
            <ul>
              {visibleTodos.map((todo) => (
                <li key={todo.id}>
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    onChange={() => handleCompleted(todo.id)}
                  />
                  <div className="todo-inputValue">
                    {todo.isEditing ? (
                      <Input
                        // type="text"
                        color="neutral"
                        size="lg"
                        variant="outlined"
                        value={todo.inputValue}
                        onChange={(e): void =>
                          handleEdit(todo.id, e.target.value)
                        }
                      />
                    ) : (
                      <div>{todo.inputValue}</div>
                    )}
                  </div>
                  <div className="buttons">
                    {todo.isEditing ? (
                      <IconButton
                        aria-label="done"
                        color="success"
                        onClick={() => handleEditing(todo.id)}
                      >
                        <CheckCircleOutlineSharpIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => handleEditing(todo.id)}
                      >
                        <EditIcon />
                      </IconButton>
                    )}
                    <IconButton
                      aria-label="delete"
                      sx={{ color: pink[500] }}
                      onClick={() => handleDelete(todo.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default App;
