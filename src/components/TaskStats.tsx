type TaskStatsProps = {
  total: number;
  completed: number;
};

export function TaskStats({ total, completed }: TaskStatsProps) {
  const percentComplete = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <span className="task-count">
          {completed} of {total} tasks completed
        </span>
        <span className="task-count">{percentComplete}%</span>
      </div>
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div
          className="h-full bg-primary rounded-full transition-all duration-500"
          style={{ width: `${percentComplete}%` }}
        />
      </div>
    </div>
  );
}
