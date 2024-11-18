import { AC } from '@/core/actions';
import { useAppDispatch } from '@/shell/store';
import { useFilter } from '@/shell/storeHooks';
import { Tabs, TabsList, TabsTrigger } from './ui/tabs';

export function TodoFilter() {
  const dispatch = useAppDispatch();
  const filter = useFilter();

  return (
    <Tabs
      value={filter}
      onValueChange={(value) => dispatch(AC['filter/set']({ filter: value as typeof filter }))}
    >
      <TabsList className="w-full">
        <TabsTrigger value="all" className="flex-1">
          All
        </TabsTrigger>
        <TabsTrigger value="active" className="flex-1">
          Active
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex-1">
          Completed
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
