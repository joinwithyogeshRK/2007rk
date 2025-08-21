import { Trash, CheckSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

type ActionButtonsProps = {
  onClearCompleted: () => void;
  onCompleteAll: () => void;
  hasCompletedTasks: boolean;
  hasActiveTasks: boolean;
};

export function ActionButtons({
  onClearCompleted,
  onCompleteAll,
  hasCompletedTasks,
  hasActiveTasks,
}: ActionButtonsProps) {
  return (
    <div className="flex gap-2">
      <Button
        onClick={onCompleteAll}
        className="btn-secondary"
        disabled={!hasActiveTasks}
      >
        <CheckSquare className="h-4 w-4 mr-1" />
        Complete All
      </Button>
      <Button
        onClick={onClearCompleted}
        className="btn-accent"
        disabled={!hasCompletedTasks}
      >
        <Trash className="h-4 w-4 mr-1" />
        Clear Completed
      </Button>
    </div>
  );
}
