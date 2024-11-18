import {
  selectFilter,
  selectFilteredTodos,
  selectTodoStats,
} from '@/core/selectors';
import { shallowEqual, useSelector } from 'react-redux';

export const useTodos = () => useSelector(selectFilteredTodos, shallowEqual);
export const useFilter = () => useSelector(selectFilter, shallowEqual);
export const useTodoStats = () => useSelector(selectTodoStats, shallowEqual);
