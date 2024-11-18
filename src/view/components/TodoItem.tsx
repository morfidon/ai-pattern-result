import { AC } from '@/core/actions';
import { Todo } from '@/core/state';
import { useAppDispatch } from '@/shell/store';
import { useState } from 'react';

type TodoItemProps = {
  todo: Todo;
};

export function TodoItem({ todo }: TodoItemProps) {
  const dispatch = useAppDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    const text = editText.trim();
    if (text && text !== todo.text) {
      dispatch(AC['todo/edit']({ id: todo.id, text }));
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <div className="group flex items-center gap-2 p-2 hover:bg-gray-50">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => dispatch(AC['todo/toggle']({ id: todo.id }))}
        className="h-5 w-5"
      />
      {isEditing ? (
        <input
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          className="flex-1 rounded border px-2 py-1"
          autoFocus
        />
      ) : (
        <span
          className={`flex-1 ${todo.completed ? 'text-gray-400 line-through' : ''}`}
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </span>
      )}
      <button
        onClick={() => dispatch(AC['todo/remove']({ id: todo.id }))}
        className="text-red-500 opacity-0 hover:text-red-700 group-hover:opacity-100"
      >
        ×
      </button>
    </div>
  );
}
