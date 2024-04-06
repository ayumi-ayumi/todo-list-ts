import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";
import React from "react";

type Props = {
  visibleTodos: Todo[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setInputText: (e: string) => void;
  inputText: string;
  addToggle: boolean;
  handleChange: (
    event:
      | React.MouseEvent<Element, MouseEvent>
      | React.KeyboardEvent<Element>
      | React.FocusEvent<Element, Element>
      | null,
    newValue: Filter,
  ) => void;
};

export default function ToolBar({
  visibleTodos,
  onSubmit,
  setInputText,
  inputText,
  addToggle,
  // setFilter
  handleChange,
}: Props) {
  return (
    <div className="input-container">
      <form onSubmit={(e) => onSubmit(e)}>
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
          // onChange={(e) => setFilter(e.target.innerText)} // Mui
          onChange={handleChange} // Mui
        >
          <Option value="all">All</Option>
          <Option value="completed">Completed</Option>
          <Option value="active">Active</Option>
        </Select>
      ) : (
        <></>
      )}
    </div>
  );
}
