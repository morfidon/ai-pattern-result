import { TodoFilter } from './components/TodoFilter';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoStats } from './components/TodoStats';

export function TodoApp() {
  return (
    <div className="mx-auto max-w-2xl p-4">
      <h1 className="mb-8 text-center text-4xl font-light">todos</h1>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <TodoInput />
        <TodoList />
        <div className="mt-4 space-y-4">
          <TodoStats />
          <TodoFilter />
        </div>
      </div>
    </div>
  );
}
