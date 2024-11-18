import { usePersistentStore } from '@/shell/hooks/usePersistentStore';
import { HamburgerMenuComponent } from './components/hamburger-menu';
import { TodoFilter } from './components/TodoFilter';
import { TodoInput } from './components/TodoInput';
import { TodoList } from './components/TodoList';
import { TodoStats } from './components/TodoStats';

export function TodoApp() {
  // Initialize persistent storage
  usePersistentStore();

  return (
    <div className="mx-auto max-w-2xl p-4">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-4xl font-light">todos</h1>
        <HamburgerMenuComponent />
      </div>
      <div className="rounded-lg bg-white p-6 shadow-lg">
        <TodoInput />
        <div className="mt-4">
          <TodoList />
        </div>
        <div className="mt-4 space-y-4">
          <TodoStats />
          <TodoFilter />
        </div>
      </div>
    </div>
  );
}
