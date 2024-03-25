import Input from "@mui/joy/Input";
import Select from "@mui/joy/Select";
import Option from "@mui/joy/Option";

type Props = {
  visibleTodos: Todo[];
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setInputText: (e: string) => void;
  inputText: string;
  addToggle: boolean;
  onChange: (_event: never, newValue: SetStateAction<string>) => void;
};

export default function ToolBar({
  visibleTodos,
  onSubmit,
  setInputText,
  inputText,
  addToggle,
  onChange,
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
          onChange={onChange} // Mui
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
