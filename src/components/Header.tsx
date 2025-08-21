import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { favicon } from '@/assets/icons/favicon-1755023481272.ico';

export function Header() {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="app-header">
      <div className="app-logo">
  TaskMaster
</div>
      <button
        onClick={toggleTheme}
        className="theme        aria-label="Toggle theme"
      >
        {theme === 'dark' ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
      </button>
    </header>
  );
}
