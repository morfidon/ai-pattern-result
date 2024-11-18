import { describe, it, expect, beforeEach, vi } from 'vitest';
import { AC } from '@/core/actions';
import { reducer } from '@/core/reducer';
import { selectFilter, selectFilteredTodos, selectTodoStats, selectTodos } from '@/core/selectors';
import { initialState, State } from '@/core/state';

describe('Todo Application', () => {
  let state: State;
  let mockStorage: Record<string, string> = {};

  // Mock localStorage before tests
  vi.stubGlobal('localStorage', {
    getItem: vi.fn((key: string) => mockStorage[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      mockStorage[key] = value;
    }),
    clear: vi.fn(() => {
      mockStorage = {};
    }),
  });

  beforeEach(() => {
    state = initialState;
    mockStorage = {};
  });

  describe('Reducer', () => {
    it('should add a todo', () => {
      const text = 'Test todo';
      state = reducer(state, AC['todo/add']({ text }));
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].text).toBe(text);
      expect(state.todos[0].completed).toBe(false);
    });

    it('should toggle todo completion', () => {
      const text = 'Test todo';
      state = reducer(state, AC['todo/add']({ text }));
      const id = state.todos[0].id;
      
      state = reducer(state, AC['todo/toggle']({ id }));
      expect(state.todos[0].completed).toBe(true);
      
      state = reducer(state, AC['todo/toggle']({ id }));
      expect(state.todos[0].completed).toBe(false);
    });

    it('should remove a todo', () => {
      state = reducer(state, AC['todo/add']({ text: 'Test todo' }));
      const id = state.todos[0].id;
      
      state = reducer(state, AC['todo/remove']({ id }));
      expect(state.todos).toHaveLength(0);
    });

    it('should edit todo text', () => {
      state = reducer(state, AC['todo/add']({ text: 'Original text' }));
      const id = state.todos[0].id;
      const newText = 'Updated text';
      
      state = reducer(state, AC['todo/edit']({ id, text: newText }));
      expect(state.todos[0].text).toBe(newText);
    });

    it('should clear completed todos', () => {
      state = reducer(state, AC['todo/add']({ text: 'Todo 1' }));
      state = reducer(state, AC['todo/add']({ text: 'Todo 2' }));
      state = reducer(state, AC['todo/toggle']({ id: state.todos[0].id }));
      
      state = reducer(state, AC['todo/clear-completed'](null));
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].text).toBe('Todo 2');
    });

    it('should set filter', () => {
      state = reducer(state, AC['filter/set']({ filter: 'active' }));
      expect(state.filter).toBe('active');
    });

    it('should reorder todos', () => {
      state = reducer(state, AC['todo/add']({ text: 'Todo 1' }));
      state = reducer(state, AC['todo/add']({ text: 'Todo 2' }));
      state = reducer(state, AC['todo/add']({ text: 'Todo 3' }));

      state = reducer(state, AC['todo/reorder']({ sourceIndex: 0, destinationIndex: 2 }));
      expect(state.todos[2].text).toBe('Todo 1');
      expect(state.todos[0].text).toBe('Todo 2');
      expect(state.todos[1].text).toBe('Todo 3');
    });
  });

  describe('Selectors', () => {
    beforeEach(() => {
      // Set up some test todos
      state = reducer(state, AC['todo/add']({ text: 'Todo 1' }));
      state = reducer(state, AC['todo/add']({ text: 'Todo 2' }));
      state = reducer(state, AC['todo/add']({ text: 'Todo 3' }));
      state = reducer(state, AC['todo/toggle']({ id: state.todos[0].id }));
    });

    it('should select all todos', () => {
      const todos = selectTodos(state);
      expect(todos).toHaveLength(3);
    });

    it('should select current filter', () => {
      state = reducer(state, AC['filter/set']({ filter: 'completed' }));
      const filter = selectFilter(state);
      expect(filter).toBe('completed');
    });

    it('should select filtered todos', () => {
      let filtered = selectFilteredTodos(state);
      expect(filtered).toHaveLength(3); // 'all' filter by default

      state = reducer(state, AC['filter/set']({ filter: 'active' }));
      filtered = selectFilteredTodos(state);
      expect(filtered).toHaveLength(2); // 2 active todos

      state = reducer(state, AC['filter/set']({ filter: 'completed' }));
      filtered = selectFilteredTodos(state);
      expect(filtered).toHaveLength(1); // 1 completed todo
    });

    it('should calculate todo stats', () => {
      const stats = selectTodoStats(state);
      expect(stats.total).toBe(3);
      expect(stats.active).toBe(2);
      expect(stats.completed).toBe(1);
    });
  });

  describe('Async Actions', () => {
    it('should handle async todo addition', () => {
      const text = 'Async todo';
      state = reducer(state, AC['todo/add-async']({ text }));
      expect(state.todos).toHaveLength(0); // Should not be added yet

      const todo = { id: '123', text, completed: false, createdAt: Date.now() };
      const newState = {
        ...state,
        todos: [...state.todos, todo],
      };
      state = reducer(state, AC['eff/todo-add-ready'](newState));
      expect(state.todos).toHaveLength(1);
      expect(state.todos[0].text).toBe(text);
    });
  });

  describe('Local Storage', () => {
    beforeEach(() => {
      state = initialState;
    });

    it('should persist and restore todos', () => {
      // Add some todos
      state = reducer(state, AC['todo/add']({ text: 'Todo 1' }));
      state = reducer(state, AC['todo/add']({ text: 'Todo 2' }));
      state = reducer(state, AC['todo/toggle']({ id: state.todos[0].id }));
      state = reducer(state, AC['filter/set']({ filter: 'completed' }));

      // Create a restored state
      const restoredState = {
        todos: state.todos,
        filter: state.filter,
      };

      // Verify restored state is handled correctly
      const newState = reducer(initialState, AC['eff/todo-add-ready'](restoredState));
      expect(newState.todos).toHaveLength(2);
      expect(newState.filter).toBe('completed');
      expect(newState.todos[0].completed).toBe(true);
      expect(newState.todos[1].completed).toBe(false);
    });
  });
});
