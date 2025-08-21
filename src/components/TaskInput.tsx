import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Priority = 'low' | 'medium' | 'high';

type TaskInputProps = {
  onAdd: (text: string, priority: Priority) => void;
};

export function TaskInput({ onAdd }: TaskInputProps) {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<Priority>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text, priority);
      setText('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add a new task..."
          className="task-input flex-1"
        />
        <Button type="submit" className="btn-primary">
          <Plus className="h-5 w-5 mr-1" />
          Add
        </Button>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">Priority:</span>
        <div className="flex gap-2">
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="priority"
              value="low"
              checked={priority === 'low'}
              onChange={() => setPriority('low')}
              className="sr-only"
            />
            <span
              className={`w-4 h-4 rounded-full border ${priority === 'low' ? 'bg-success border-success' : 'border-input'}`}
            />
            <span>Low</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="priority"
              value="medium"
              checked={priority === 'medium'}
              onChange={() => setPriority('medium')}
              className="sr-only"
            />
            <span
              className={`w-4 h-4 rounded-full border ${priority === 'medium' ? 'bg-warning border-warning' : 'border-input'}`}
            />
            <span>Medium</span>
          </label>
          <label className="flex items-center gap-1 cursor-pointer">
            <input
              type="radio"
              name="priority"
              value="high"
              checked={priority === 'high'}
              onChange={() => setPriority('high')}
              className="sr-only"
            />
            <span
              className={`w-4 h-4 rounded-full border ${priority === 'high' ? 'bg-error border-error' : 'border-input'}`}
            />
            <span>High</span>
          </label>
        </div>
      </div>
    </form>
  );
}
