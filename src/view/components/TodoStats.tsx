import { AC } from '@/core/actions';
import { useAppDispatch } from '@/shell/store';
import { useTodoStats } from '@/shell/storeHooks';

export function TodoStats() {
  const dispatch = useAppDispatch();
  const stats = useTodoStats();

  return (
    <div className="flex items-center justify-between text-sm text-gray-500">
      <span>
        {stats.active} item{stats.active !== 1 ? 's' : ''} left
      </span>
      {stats.completed > 0 && (
        <button
          onClick={() => dispatch(AC['todo/clear-completed'](null))}
          className="text-blue-500 hover:underline"
        >
          Clear completed
        </button>
      )}
    </div>
  );
}
