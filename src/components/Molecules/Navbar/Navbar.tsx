import { NavLink } from 'react-router-dom';

const links = [
  { to: '/home', label: 'Home' },
  { to: '/phones', label: 'Phones' },
  { to: '/tablets', label: 'Tablets' },
  { to: '/accessories', label: 'Accessories' },
  { to: '/favourites', label: 'Favourites' },
  { to: '/cart', label: 'Cart' },
];

export const Navbar = () => {
  return (
    <header className="bg-[#0f1121] text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 border-b border-gray-700">
        <div className="text-xl font-bold">
          NICE<span className="text-yellow-400">👌</span>GADGETS
        </div>
        <nav className="flex gap-6">
          {links.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `uppercase text-sm pb-1 border-b-2 font-medium tracking-wide transition-all duration-200 ${
                  isActive ? 'border-white' : (
                    'border-transparent text-gray-400 hover:text-white'
                  )
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};
