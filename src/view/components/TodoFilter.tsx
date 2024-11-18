import { AC } from '@/core/actions';
import { State } from '@/core/state';
import { cn } from '@/lib/utils';
import { useAppDispatch } from '@/shell/store';
import { useFilter } from '@/shell/storeHooks';

const filters: { label: string; value: State['filter'] }[] = [
  { label: 'All', value: 'all' },
  { label: 'Active', value: 'active' },
  { label: 'Completed', value: 'completed' },
];

export function TodoFilter() {
  const dispatch = useAppDispatch();
  const currentFilter = useFilter();

  return (
    <div className="flex justify-center gap-2">
      {filters.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => dispatch(AC['filter/set']({ filter: value }))}
          className={cn(
            'rounded px-3 py-1',
            currentFilter === value
              ? 'bg-blue-500 text-white'
              : 'text-gray-600 hover:bg-gray-100',
          )}
        >
          {label}
        </button>
      ))}
    </div>
  );
}
