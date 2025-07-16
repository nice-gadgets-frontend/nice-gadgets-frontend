import { Switch } from '@headlessui/react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (enabled) {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light'
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
      checked={enabled}
      onChange={setEnabled}
      className={`group inline-flex h-6 w-11 items-center rounded-full transition ${
        enabled ? 'bg-[var(--color-accent)]' : 'bg-[var(--color-elements)]'
      }`}
    >
      <span
        className={`size-4 transform rounded-full bg-white transition ${
          enabled ? 'translate-x-6' : 'translate-x-1'
        }`}/>
    </Switch>
  )
}