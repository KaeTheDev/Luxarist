import { Link } from "react-router-dom";
import { useState } from "react";
import { categories } from "../../features/categories/data";

export function Navbar() {
  const [isShopOpen, setIsShopOpen] = useState<boolean>(false);

  // Toggle dropdown
  const handleDropDown = () => setIsShopOpen((prev) => !prev);

  return (
    <header className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="shrink-0">
          <img
            src="/assets/logos/LuxaristLogo.png"
            alt="Luxarist Logo"
            className="h-10 w-auto"
          />
        </Link>

        <nav>
          <ul className="flex items-center gap-10 text-gray-900 font-medium tracking-tight">
            <li>
              <Link to="/" className="hover:text-gray-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/collections"
                className="hover:text-gray-500 transition-colors"
              >
                Collections
              </Link>
            </li>

            {/* DROPDOWN TRIGGER */}
            <li className="relative">
              <button
                onClick={handleDropDown}
                className={`flex items-center cursor-pointer transition-colors ${
                  isShopOpen ? "text-gray-400" : "hover:text-gray-500"
                }`}
              >
                Shop
                <svg
                  className={`w-4 h-4 ml-1 transition-transform duration-200 ${
                    isShopOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>

              {/* DROPDOWN MENU */}
              {isShopOpen && (
                <ul className="absolute left-0 mt-4 w-44 bg-white border border-gray-200 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] py-3 z-50">
                  {categories.map(([label, slug]) => (
                    <li key={slug}>
                      <Link
                        to={`/collections/${slug}`}
                        className="block px-6 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-black transition-all duration-200 ease-in-out"
                        onClick={() => setIsShopOpen(false)}
                      >
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul> 
              )}
            </li>
          </ul>
        </nav>

        {/* ACTIONS */}
        <div className="flex items-center gap-6">
          <button
            aria-label="Toggle cart"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src="/assets/icons/icon-cart.svg"
              alt="cart"
              className="h-5 w-5"
            />
          </button>
          <button
            aria-label="Open profile"
            className="hover:opacity-70 transition-opacity"
          >
            <img
              src="/assets/icons/icon-profile.svg"
              alt="profile"
              className="h-5 w-5"
            />
          </button>
        </div>
      </div>
    </header>
  );
}