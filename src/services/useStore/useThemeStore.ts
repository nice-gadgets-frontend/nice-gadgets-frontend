import { create } from 'zustand';

type ThemeStore = {
  isDark: boolean;
  toggleTheme: () => void;
  setTheme: (value: boolean) => void;
};

export const useThemeStore = create<ThemeStore>((set) => ({
  isDark:
    localStorage.theme === 'dark' ||
    (!('theme' in localStorage) &&
      window.matchMedia('(prefers-color-scheme: dark)').matches),

  toggleTheme: () =>
    set((state) => {
      const newTheme = !state.isDark;

      if (newTheme) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      }

      return { isDark: newTheme };
    }),

  setTheme: (value) =>
    set(() => {
      if (value) {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      }

      return { isDark: value };
    }),
}));
