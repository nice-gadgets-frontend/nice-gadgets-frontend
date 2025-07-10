import { Outlet } from 'react-router-dom';
import { Navbar } from './components/Molecules/Header/header';
import { Footer } from './components/Molecules/Footer/Footer';

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow px-4 sm:px-6 lg:px-8 py-6 bg-[#0F1121]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
