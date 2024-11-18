import { AC, AT } from '@/core/actions';
import { Todo } from '@/core/state';
import { delay } from '@/shell/effects';
import { AppMiddleware, isAppAction } from '@/shell/store';

export const todoMiddleware: AppMiddleware =
  (store) => (next) => async (action) => {
    if (!isAppAction(action)) {
      return next(action);
    }

    const result = next(action);

    if (action.type === AT['todo/add-async']) {
      await delay(1000); // Simulate API call
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        text: action.payload.text,
        completed: false,
        createdAt: Date.now(),
      };
      store.dispatch(AC['eff/todo-add-ready'](newTodo));
    }

    return result;
  };
