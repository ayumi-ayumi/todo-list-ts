import { useState, useEffect, SetStateAction } from "react";
import "./style/App.css";
import { v4 as uuidv4 } from "uuid";
import ToolBar from "./components/ToolBar";
import Todolist from "./components/Todolist";
import Auth from "./components/Auth";
import type { User } from "firebase/auth";
import { auth } from "./firebase/BaseConfig";
import { Routes, Route } from "react-router-dom";



type UserType = User | null;

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() =>
    JSON.parse(localStorage.getItem("TODOS") ?? "[]"),
  );
  const [addToggle, setAddToggle] = useState<boolean>(false);
  const [filter, setFilter] = useState<string>("all");
  const [user, setUser] = useState<UserType>(null);

  useEffect(() => {
    localStorage.setItem("TODOS", JSON.stringify(todos));
    setAddToggle(false);
  }, [todos]);

  useEffect(() => {
    const authStateChanged = auth.onAuthStateChanged((user) => {
      setUser(user);
    });
    return () => {
      authStateChanged();
    };
  }, []);

  // Submit a todo task
  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
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

  function Todo() {
    return (

      <div className="App">
        <div className="container">
          <h1>Todo list</h1>
          <ToolBar
            onSubmit={handleSubmit}
            setInputText={setInputText}
            inputText={inputText}
            addToggle={addToggle}
            visibleTodos={visibleTodos}
            onChange={handleChange}
          />
          {visibleTodos.length ? (
            <Todolist
              visibleTodos={visibleTodos}
              handleCompleted={handleCompleted}
              handleEdit={handleEdit}
              toggleEdit={toggleEdit}
              handleDelete={handleDelete}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    )
  }

  return (
    <Routes>
      <Route path={`/`} element={<Auth />} />
      <Route path={`/todo`} element={<Todo />} />
    </Routes>
    // <>{user ? <Todo /> : <Auth />}</>
  );
}

export default App;

