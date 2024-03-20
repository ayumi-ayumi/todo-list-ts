import { FormEvent, useState, useEffect, SetStateAction } from "react";
import "./style/App.css";
import { v4 as uuidv4 } from "uuid";
import Input from "@mui/joy/Input";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import { pink } from "@mui/material/colors";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import {DndContext} from '@dnd-kit/core';

import {Draggable} from './Draggable';
import {Droppable} from './Droppable';

import  ToolBar  from "./components/ToolBar";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() =>
    JSON.parse(localStorage.getItem("TODOS") ?? "[]"),
  );
  const [addToggle, setAddToggle] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>('all');

  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = (
    <Draggable>Drag me</Draggable>
  );

  function handleDragEnd(event) {
    if (event.over && event.over.id === 'droppable') {
      setIsDropped(true);
    }
  }


  // type Filter = 'all' | 'completed' | 'active' ;

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

  const todosCopy = todos.map((todo) => ({ ...todo }));
  // Toggle an edit boolean
  function toggleEdit(id: string): void {
    setTodos(
      todosCopy.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isEditing: !todo.isEditing };
        }
        return todo;
      }),
    );
  }

  //Edit a task
  function handleEdit(id: string, inputValue: string): void {
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
    setTodos(
      todosCopy.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      }),
    );
  }

  // Choose a filter tab
  function handleChange(_event: never, newValue: SetStateAction<string>): void {
    // setTab(newValue);
    setFilter(newValue);
  }

  // Filter todolist into "Completed" or "Active"
  function filterTodos(todos: Todo[], filter: Filter) {
    return todos.filter((todo) => {
      if (filter === "all") {
        return true;
      } else if (filter === "active") {
        return todo.completed === false;
      } else if (filter === "completed") {
        return todo.completed === true;
      }
    });
  }

  const visibleTodos = filterTodos(todos, filter);

  // Delete a task
  function handleDelete(id: string): void {
    const todosCopy = todos.map((todo) => ({ ...todo }));
    const newTodos = todosCopy.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Todo list</h1>
        {/*<div className="input-container">
          <form onSubmit={(e) => handleSubmit(e)}>
            {addToggle && (
              <Input
                onChange={(e) => setInputText(e.target.value)}
                color="neutral"
                size="lg"
                variant="outlined"
                value={inputText}
              />
            )}
            <Input
              type="submit"
              value="+ Add Task"
              color="primary"
              variant="solid"
              className="submitButton"
            />
          </form>
          {visibleTodos.length ? (
            <Select
              color="neutral"
              placeholder="All"
              sx={{ width: "36%" }}
              variant="solid"
              onChange={handleChange} // Mui
            >
              <Option value="all">All</Option>
              <Option value="completed">Completed</Option>
              <Option value="active">Active</Option>
            </Select>
          ) : (
            <></>
          )}
          </div> */}
        <ToolBar onSubmit={handleSubmit} setInputText={setInputText} inputText={inputText} addToggle={addToggle} visibleTodos={visibleTodos} onChange={handleChange}/>

   
            

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
                        onClick={() => toggleEdit(todo.id)}
                      >
                        <CheckCircleOutlineSharpIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        aria-label="edit"
                        color="primary"
                        onClick={() => toggleEdit(todo.id)}
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
