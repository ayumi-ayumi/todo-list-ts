declare type Todo = {
  id: string;
  inputValue: string;
  completed: boolean;
  isEditing: boolean;
  date: Date;
};

declare type UserType = User | null;

type Filter = "all" | "completed" | "active";
