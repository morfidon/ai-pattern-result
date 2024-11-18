import { AC } from '@/core/actions';
import { useAppDispatch } from '@/shell/store';
import { useState } from 'react';

export function TodoInput() {
  const dispatch = useAppDispatch();
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      dispatch(AC['todo/add']({ text: text.trim() }));
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="What needs to be done?"
        className="w-full rounded-lg border px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}
