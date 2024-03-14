import { FormEvent, useState, useEffect } from "react";
import "./App.css";
import { v4 as uuidv4 } from "uuid";
import Input from "@mui/joy/Input";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import { pink } from "@mui/material/colors";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

function App() {
  const [inputText, setInputText] = useState("");
  // const [todos, setTodos] = useState<Todo[]>(()=>loadTodos());
  const [todos, setTodos] = useState<Todo[]>(() =>
    JSON.parse(localStorage.getItem("TODOS") ?? "[]")
  );
  const [addToggle, setAddToggle] = useState<boolean>(false);

  type Todo = {
    id: string;
    inputValue: string;
    completed: boolean;
    isEditing: boolean;
    date: Date;
  };

  // useEffect(() => {
  //   // const todoJSON = localStorage.getItem('TODOS')
  //   // console.log(todoJSON)
  //   // if (todoJSON) {
  //   //     const todoJSONParse = JSON.parse(todoJSON)
  //   //     setTodos(todoJSONParse)
  //   // }
  //   const todoJSON = localStorage.getItem("TODOS")
  //   if (todoJSON) {
  //     const todoJSONParse = JSON.parse(todoJSON)
  //     console.log(todoJSONParse)

  //     setTodos(todoJSONParse)
  //   }
  //   // if (todoJSON !== null) {
  //   //   const todoJSONParse = JSON.parse(todoJSON)
  //   //   setTodos(todoJSONParse)
  //   // }
  //   // return JSON.parse(localStorageTodoList ?? "[]");
  //   // const todoJSON = JSON.parse(localStorage.getItem('TODOS') ?? "[]");
  //   // if (todoJSON) {
  //   //   setTodos(todoJSON);
  //   //  }
  // }, []);

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
    setAddToggle(false);
  }, [todos]);

  // function handleChange(e: ChangeEvent<HTMLInputElement>) {
  //   e.preventDefault();
  //   setInputText(e.target.value);
  // }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
    // setInputText(inputText);
    setInputText("");
    // saveTodos()
  }

  function handleEditing(id: string) {
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

  function handleEditingDone(id: string) {
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
  function handleEdit(id: string, inputValue: string) {
    const todosCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = todosCopy.map((todo) => {
      if (todo.id === id) {
        todo.inputValue = inputValue;
      }
      return todo;
    });
    setTodos(newTodos);
    // saveTodos();
  }

  //Check a task
  function handleCompleted(id: string) {
    const todosCopy = todos.map((todo) => ({ ...todo }));
    setTodos(
      todosCopy.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      })
    );
    // const newTodos = todosCopy.map((todo) => {
    //   if (todo.id === id) {
    //     return {...todo, todo.completed: !todo.completed}
    //   }
    //   return todo;
    // });
    // setTodos(newTodos);
    // saveTodos();
  }

  // function toggleCompleted(id) {
  //   setTasks(tasks.map(task => {
  //   if (task.id === id) {
  //   return {…task, completed: !task.completed};
  //   } else {
  //   return task;
  //   }
  //   }));

  // Delete a task
  function handleDelete(id: string) {
    const todosCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = todosCopy.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  // function saveTodos() {
  //   localStorage.setItem("TODOS", JSON.stringify(todos));
  // }

  // function loadTodos(): Todo[] {
  //   const todoJSON = localStorage.getItem("TODOS");
  //   if (todoJSON == null) return [];
  //   return JSON.parse(todoJSON);
  // }

  return (
    <div className="App">
      <div style={{ width: "80%", backgroundColor: "#ffffff" }}>
        <h1>Todo list</h1>
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
            value="+ Add"
            color="primary"
            variant="solid"
            size="lg"
            className="submitButton"
          />
        </form>
        <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select
          displayEmpty
          inputProps={{ 'aria-label': 'Without label' }}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>ï

        {todos.length ? (
          <div className="list-container">
            <ul>
              {todos.map((todo) => (
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
                        onChange={(e) => handleEdit(todo.id, e.target.value)}
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
