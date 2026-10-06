
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/cartcontext";
/*import { useTheme } from "../context/themecontext";*/

export default function Navbar() {
  const { totalItems } = useCart();
  /*const { darkMode, toggleDarkMode } = useTheme();*/

  const navClass = ({ isActive }) =>
    `font-medium transition ${
      isActive
        ? "text-violet-600"
        : "text-slate-600 hover:text-violet-600"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-[#FCF7FA] shadow-sm backdrop-blur">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex shrink-0 items-center gap-2">
          <img
            src="../logo.png"
            alt="MangaNook Logo"
            className="h-10 w-10 shrink-0 object-contain"
          />

          <span className="text-xl font-extrabold tracking-tight text-slate-800 sm:text-2xl">
            Manga<span className="text-violet-600">Nook</span>
          </span>
        </Link>

        {/* Page Navigation */}
        <div className="flex items-center gap-4 sm:gap-6">
          <NavLink to="/" end className={navClass}>
            Home
          </NavLink>

          <NavLink to="/products" className={navClass}>
            Products
          </NavLink>

          <NavLink
            to="/cart"
            aria-label={`Shopping cart, ${totalItems} items`}
            className={({ isActive }) =>
              `relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg transition ${
                isActive
                  ? "bg-violet-200"
                  : "bg-[#EAE2FF] hover:bg-violet-200"
              }`
            }
          >
            <img src="../cart.svg" alt="Cart Icon" className="h-5 w-5" />

            {totalItems > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-violet-600 px-1 text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </NavLink>

          {/* Dark Mode Toggle
          <button
            onClick={toggleDarkMode}
            className="rounded-full border border-slate-200 bg-white px-3 py-2 text-lg transition hover:bg-slate-100"
            aria-label="Toggle dark mode"
          >
            {darkMode ? 
            <img src="../sun.svg" alt="Sun Icon" className="h-5 w-5" /> :
            <img src="../suncloud.svg" alt="Sun with Cloud Icon" className="h-5 w-5" />}
          </button> */}
        </div>
      </nav>
    </header>
  );
}