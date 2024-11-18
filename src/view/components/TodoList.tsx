import { AC } from '@/core/actions';
import { useAppDispatch } from '@/shell/store';
import { useTodos } from '@/shell/storeHooks';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { TodoItem } from './TodoItem';

export function TodoList() {
  const dispatch = useAppDispatch();
  const todos = useTodos();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    dispatch(
      AC['todo/reorder']({
        sourceIndex: result.source.index,
        destinationIndex: result.destination.index,
      })
    );
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todo-list">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {todos.map((todo, index) => (
              <Draggable key={todo.id} draggableId={todo.id} index={index}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className={`transition-transform ${
                      snapshot.isDragging ? 'z-10 opacity-75' : ''
                    }`}
                  >
                    <div {...provided.dragHandleProps} className="cursor-grab active:cursor-grabbing">
                      <TodoItem todo={todo} />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}
