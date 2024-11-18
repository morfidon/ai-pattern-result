import { Action, AT } from './actions';
import { initialState, State, Todo } from './state';

export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case AT['todo/add']: {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: action.payload.text,
        completed: false,
        createdAt: Date.now(),
      };
      return {
        ...state,
        todos: [...state.todos, newTodo],
      };
    }

    case AT['todo/toggle']: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, completed: !todo.completed }
            : todo,
        ),
      };
    }

    case AT['todo/remove']: {
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload.id),
      };
    }

    case AT['todo/edit']: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo,
        ),
      };
    }

    case AT['todo/clear-completed']: {
      return {
        ...state,
        todos: state.todos.filter((todo) => !todo.completed),
      };
    }

    case AT['filter/set']: {
      return {
        ...state,
        filter: action.payload.filter,
      };
    }

    case AT['eff/todo-add-ready']: {
      return {
        ...state,
        todos: [...state.todos, action.payload],
      };
    }

    default:
      return state;
  }
};
