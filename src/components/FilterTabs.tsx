type FilterTabsProps = {
  filter: 'all' | 'active' | 'completed';
  onFilterChange: (filter: 'all' | 'active' | 'completed') => void;
  counts: {
    all: number;
    active: number;
    completed: number;
  };
};

export function FilterTabs({ filter, onFilterChange, counts }: FilterTabsProps) {
  return (
    <div className="flex space-x-2">
      <button
        className={`filter-tab ${filter === 'all' ? 'filter-tab-active' : ''}`}
        onClick={() => onFilterChange('all')}
      >
        All ({counts.all})
      </button>
      <button
        className={`filter-tab ${filter === 'active' ? 'filter-tab-active' : ''}`}
        onClick={() => onFilterChange('active')}
      >
        Active ({counts.active})
      </button>
      <button
        className={`filter-tab ${filter === 'completed' ? 'filter-tab-active' : ''}`}
        onClick={() => onFilterChange('completed')}
      >
        Completed ({counts.completed})
      </button>
    </div>
  );
}
