import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { TaskInput } from '../components/TaskInput';
import { TaskList } from '../components/TaskList';
import { FilterTabs } from '../components/FilterTabs';
import { TaskStats } from '../components/TaskStats';
import { ActionButtons } from '../components/ActionButtons';
import { generateId } from '../lib/utils';

type Priority = 'low' | 'medium' | 'high';

type Task = {
  id: string;
  text: string;
  completed: boolean;
  priority: Priority;
};

const STORAGE_KEY = 'taskmaster-tasks';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text: string, priority: Priority) => {
    const newTask: Task = {
      id: generateId(),
      text,
      completed: false,
      priority,
    };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (id: string, newText: string) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, text: newText } : task))
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const completeAll = () => {
    setTasks(tasks.map((task) => ({ ...task, completed: true })));
  };

  const activeTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  const counts = {
    all: tasks.length,
    active: activeTasks.length,
    completed: completedTasks.length,
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 max-w-3xl py-8">
        <div className="space-y-8">
          <TaskInput onAdd={addTask} />
          
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <FilterTabs
                filter={filter}
                onFilterChange={setFilter}
                counts={counts}
              />
              <ActionButtons
                onClearCompleted={clearCompleted}
                onCompleteAll={completeAll}
                hasCompletedTasks={completedTasks.length > 0}
                hasActiveTasks={activeTasks.length > 0}
              />
            </div>
            
            <TaskList
              tasks={tasks}
              filter={filter}
              onToggle={toggleTask}
              onDelete={deleteTask}
              onEdit={editTask}
            />
            
            {tasks.length > 0 && (
              <TaskStats
                total={tasks.length}
                completed={completedTasks.length}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
