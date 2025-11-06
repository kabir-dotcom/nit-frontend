import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import nitLogoGreen from '../assets/photo/NIT final.png';
import nitLogoWhite from '../assets/photo/NIT white.png';

const navItems = [
  { label: 'HOME', path: '/' },
  { label: 'ABOUT US', path: '/about' },
  { label: 'OUR THERAPIES', path: '/diseases', caret: true },
  { label: 'WHY CHOOSE NIT', path: '/boosters' },
  { label: 'PAGE', path: '/blog', caret: true },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(prev => !prev);

  const closeMenu = () => setIsOpen(false);

  const renderCaret = () => (
    <svg
      className="h-2.5 w-2.5 text-slate-700 transition group-hover:text-primary-500"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M3 4.5 6 7.5 9 4.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <header className="sticky top-0 z-50 bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between border-b border-[#0d7120] px-5 py-4 sm:px-12 lg:px-10">
        <Link to="/" className="flex items-center">
          <img
            src={nitLogoGreen}
            onError={event => {
              event.currentTarget.src = nitLogoWhite;
            }}
            alt="Natural Immunotherapy logo"
            className="h-16 w-auto object-contain lg:h-20"
            draggable="false"
          />
        </Link>

        <nav className="hidden items-center gap-12 pl-4 font-inter md:flex">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  'group flex items-center gap-2 whitespace-nowrap text-sm font-semibold tracking-[0.25em] uppercase transition-colors',
                  isActive ? 'text-[#0a7c1b]' : 'text-slate-900 hover:text-[#0a7c1b]',
                ].join(' ')
              }
              onClick={closeMenu}
            >
              {item.label}
              {item.caret && renderCaret()}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-5 pl-6 md:flex">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0a7c1b] text-white shadow-[0_8px_16px_rgba(12,99,24,0.28)]">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                d="M21 11.5a8.5 8.5 0 1 0-16.251 3.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 11.5h4m14 0a8.5 8.5 0 0 1-8.5 8.5m8.5-8.5H17m-4.5 8.5H9"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M12.5 17.5c0 .828-.672 1.5-1.5 1.5a1.5 1.5 0 0 1 0-3c.828 0 1.5.672 1.5 1.5Z"
                fill="currentColor"
              />
            </svg>
          </span>
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 whitespace-nowrap rounded-full bg-gradient-to-r from-[#005E05] via-[#0a7c1b] to-[#064d14] px-7 py-2 text-sm font-semibold text-white shadow-[0_14px_28px_rgba(7,71,21,0.32)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_34px_rgba(7,71,21,0.4)] font-montserrat"
          >
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-white/18">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <rect x="4" y="6" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
                <path d="M4 10h16" stroke="currentColor" strokeWidth="1.5" />
                <path d="M9 14h2m3 0h2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </span>
            <span>CONTACT US</span>
            <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-[#ccff2e] text-[#0c5217]">
              <svg
                className="h-3 w-3"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
          </Link>
        </div>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-primary-500 px-3 py-2 text-sm font-semibold text-white shadow hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-400 md:hidden"
          onClick={toggleMenu}
          aria-label="Toggle navigation menu"
        >
          <svg
            className={`h-5 w-5 transition-transform ${isOpen ? 'rotate-90' : ''}`}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {isOpen ? (
              <path d="M18 6L6 18M6 6l12 12" />
            ) : (
              <>
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </>
            )}
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <nav className="space-y-1 border-t border-[#0d7120]/20 bg-white px-4 py-4 font-inter">
            {navItems.map(item => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  [
                    'flex items-center justify-between rounded-md px-3 py-2 text-sm font-semibold uppercase tracking-[0.22em]',
                    isActive ? 'bg-[#e6f6ea] text-[#0a7c1b]' : 'text-slate-700 hover:bg-[#eef9f1] hover:text-[#0a7c1b]',
                  ].join(' ')
                }
                onClick={closeMenu}
              >
                <span>{item.label}</span>
                {item.caret && renderCaret()}
              </NavLink>
            ))}
            <Link
              to="/contact"
              onClick={closeMenu}
              className="mt-3 flex items-center justify-between rounded-md bg-primary-500 px-3 py-2 text-base font-semibold text-white shadow hover:bg-primary-600 font-montserrat"
            >
              <span>Contact Us</span>
              <svg
                className="h-4 w-4 text-accent"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
              >
                <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
