import { State, Todo, initialState } from '@/core/state';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useLocalStorageState from 'use-local-storage-state';
import { AC } from '@/core/actions';

const TODO_STORAGE_KEY = 'todo-app-state';

interface StoredState {
  todos: Todo[];
  filter: State['filter'];
}

export function usePersistentStore() {
  const dispatch = useDispatch();
  const currentTodos = useSelector((state: State) => state.todos);
  const currentFilter = useSelector((state: State) => state.filter);

  // In test environment, we'll use a mock
  const isTestEnv = process.env.NODE_ENV === 'test';

  const [storedState, setStoredState] = useLocalStorageState<StoredState>(
    TODO_STORAGE_KEY,
    {
      defaultValue: {
        todos: initialState.todos,
        filter: initialState.filter,
      },
    }
  );

  // Load initial state from localStorage
  useEffect(() => {
    if (isTestEnv) return; // Skip in test environment

    // Only load if we have stored todos and the current state is empty
    if (storedState.todos.length > 0 && currentTodos.length === 0) {
      // Load all todos at once to prevent duplicate renders
      const restoredState = {
        ...initialState,
        todos: storedState.todos,
        filter: storedState.filter,
      };
      dispatch(AC['eff/todo-add-ready'](restoredState));
    }
  }, [storedState, dispatch, currentTodos.length, isTestEnv]);

  // Save state changes to localStorage
  useEffect(() => {
    if (isTestEnv) return; // Skip in test environment

    setStoredState({
      todos: currentTodos,
      filter: currentFilter,
    });
  }, [currentTodos, currentFilter, setStoredState, isTestEnv]);
}
