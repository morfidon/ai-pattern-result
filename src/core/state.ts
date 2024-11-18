export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
};

export type State = {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
};

export const initialState: State = {
  todos: [],
  filter: 'all',
};
