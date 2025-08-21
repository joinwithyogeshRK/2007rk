import { useState } from 'react';
import { Trash, Edit, Check, X } from 'lucide-react';
import { cn } from '../lib/utils';

type Priority = 'low' | 'medium' | 'high';

type TaskItemProps = {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export function TaskItem({
  id,
  text,
  completed,
  priority,
  onToggle,
  onDelete,
  onEdit,
}: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
    setEditText(text);
  };

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(id, editText);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditText(text);
  };

  const getPriorityClass = () => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return 'priority-low';
    }
  };

  return (
    <div className="group task-item">
      {!isEditing ? (
        <>
          <div className="flex items-center gap-3 flex-1">
            <input
              type="checkbox"
              checked={completed}
              onChange={() => onToggle(id)}
              className="checkbox"
              id={`task-${id}`}
            />
            <div className="flex items-center gap-2">
              <span className={cn('priority-indicator', getPriorityClass())} />
              <label
                htmlFor={`task-${id}`}
                className={cn(completed && 'task-complete')}
              >
                {text}
              </label>
            </div>
          </div>
          <div className="task-actions">
            <button
              onClick={handleEdit}
              className="p-1 rounded-full hover:bg-muted transition-colors duration-200"
              aria-label="Edit task"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={() => onDelete(id)}
              className="delete-btn"
              aria-label="Delete task"
            >
              <Trash className="h-4 w-4" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-2 w-full">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="task-input flex-1"
            autoFocus
          />
          <button
            onClick={handleSave}
            className="p-1 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary-600 transition-colors duration-200"
            aria-label="Save changes"
          >
            <Check className="h-4 w-4" />
          </button>
          <button
            onClick={handleCancel}
            className="p-1 rounded-full bg-accent text-accent-foreground hover:bg-accent-600 transition-colors duration-200"
            aria-label="Cancel editing"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
}
