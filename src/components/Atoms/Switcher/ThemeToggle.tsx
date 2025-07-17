import { Switch } from '@headlessui/react';
import { useEffect, useState } from 'react';
import { useThemeStore } from '../../../services/useStore/useThemeStore';

export function ThemeToggle() {
  const [enabled, setEnabled] = useState(
    localStorage.theme === 'dark' || false,
  );

  const isDark = useThemeStore((state) => state.isDark);
  const toggleTheme = useThemeStore((state) => state.toggleTheme);

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
    }
  }, [enabled]);

  useEffect(() => {
    const isDark =
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches);

    setEnabled(isDark);
  }, []);

  return (
    <Switch
      checked={isDark}
      onChange={toggleTheme}
      className={`group inline-flex h-6 w-11 items-center rounded-full transition cursor-pointer ${
        isDark ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-elements)]'
      }`}
    >
      <span
        className={`size-4 transform rounded-full bg-white transition cursor-pointer ${
          isDark ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </Switch>
  );
}
