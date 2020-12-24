export interface Todo {
  id: string;
  desc: string;
  isComplete: boolean;
}

export interface State {
  todos: Todop[];
  selectedTodoId: string | null;
  counter: number;
}
