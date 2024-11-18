import { State } from './state';

export const selectTodos = (state: State) => state.todos;
export const selectFilter = (state: State) => state.filter;
export const selectFilteredTodos = (state: State) => {
  const todos = selectTodos(state);
  const filter = selectFilter(state);

  switch (filter) {
    case 'active':
      return todos.filter((todo) => !todo.completed);
    case 'completed':
      return todos.filter((todo) => todo.completed);
    default:
      return todos;
  }
};

export const selectTodoStats = (state: State) => {
  const todos = selectTodos(state);
  return {
    total: todos.length,
    active: todos.filter((todo) => !todo.completed).length,
    completed: todos.filter((todo) => todo.completed).length,
  };
};
