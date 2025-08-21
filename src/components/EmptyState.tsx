import { ClipboardList } from 'lucide-react';

type EmptyStateProps = {
  filter: 'all' | 'active' | 'completed';
};

export function EmptyState({ filter }: EmptyStateProps) {
  let message = '';

  switch (filter) {
    case 'all':
      message = 'No tasks yet. Add your first task!';
      break;
    case 'active':
      message = 'No active tasks. All done!';
      break;
    case 'completed':
      message = 'No completed tasks yet.';
      break;
    default:
      message = 'No tasks found.';
  }

  return (
    <div className="empty-state">
      <ClipboardList className="h-16 w-16 text-muted-foreground mb-2" />
      <p>{message}</p>
    </div>
  );
}
