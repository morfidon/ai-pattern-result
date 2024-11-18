import { TodoItem } from './TodoItem';
import { useTodos } from '@/shell/storeHooks';

export function TodoList() {
  const todos = useTodos();

  return (
    <div className="divide-y">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
