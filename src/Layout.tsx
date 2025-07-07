import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Molecules/Navbar/Navbar';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 py-6">
        <Outlet />
      </main>
      <footer className="text-center py-4 text-gray-500 text-sm">
        © 2025 Nice Gadgets
      </footer>
    </div>
  );
};
