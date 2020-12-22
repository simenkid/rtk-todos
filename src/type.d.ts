export interface Todo {
  id: string;
  desc: string;
  isComplete: boolean;
}

export interface State {
  todos: Todop[];
  selectedTodo: string | null;
  counter: number;
}
