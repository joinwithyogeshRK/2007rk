import { TaskItem } from './TaskItem';
import { EmptyState } from './EmptyState';

type Priority = 'low' | 'medium' | 'high';

type Task = {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
};

type TaskListProps = {
  tasks: Task[];
  filter: 'all' | 'active' | 'completed';
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
};

export function TaskList({ tasks, filter, onToggle, onDelete, onEdit }: TaskListProps) {
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'all') return true;
    if (filter === 'active') return !task.completed;
    if (filter === 'completed') return task.completed;
    return true;
  });

  if (filteredTasks.length === 0) {
    return <EmptyState filter={filter} />;
  }

  return (
    <div className="space-y-2 animate-fade-in">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          text={task.text}
          completed={task.completed}
          priority={task.priority}
          onToggle={onToggle}
          onDelete={onDelete}
          onEdit={onEdit}
        />
      ))}
    </div>
  );
}
