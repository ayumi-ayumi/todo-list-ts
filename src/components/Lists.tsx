import IconButton from "@mui/material/IconButton";
import Input from "@mui/joy/Input";
import { pink } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import CheckCircleOutlineSharpIcon from "@mui/icons-material/CheckCircleOutlineSharp";
import React from "react";

type Props = {
  visibleTodos: Todo[];
  handleCompleted: (id: string) => void;
  handleEdit: (id: string, inputValue: string) => void;
  toggleEdit: (id: string) => void;
  handleDelete: (id: string) => void;
};

export default function Lists({
  visibleTodos,
  handleCompleted,
  handleEdit,
  toggleEdit,
  handleDelete,
}: Props) {
  return (
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
                  onChange={(e): void => handleEdit(todo.id, e.target.value)}
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
  );
}
