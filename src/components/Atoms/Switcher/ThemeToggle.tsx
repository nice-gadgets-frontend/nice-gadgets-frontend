export const ThemeToggle = () => {
  const toggleDarkMode = () => {
    document.documentElement.classList.toggle('dark');
  };

  return (
    <button onClick={toggleDarkMode}
      className="px-4 py-2 border rounded-2xl">
      Toggle Dark Mode
    </button>
  );
};