import { Middleware } from 'redux';
import { Action, AC, AT } from '@/core/actions';
import { State, Todo } from '@/core/state';

export const todoMiddleware: Middleware<object, State> =
  (store) => (next) => (action: unknown) => {
    if (action && typeof action === 'object' && 'type' in action && action.type === AT['todo/add-async']) {
      const typedAction = action as Extract<Action, { type: typeof AT['todo/add-async'] }>;
      const result = next(typedAction);
      
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: typedAction.payload.text,
        completed: false,
        createdAt: Date.now(),
      };

      store.dispatch(
        AC['eff/todo-add-ready']({
          ...store.getState(),
          todos: [...store.getState().todos, newTodo],
        })
      );

      return result;
    }

    return next(action);
  };
