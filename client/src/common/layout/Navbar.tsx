import { Link } from "react-router-dom";
import { useState } from "react";
import { categories } from "../../features/categories/data";

export function Navbar() {
    const [isShopOpen, setIsShopOpen] = useState<boolean>(false);

    function handleDropDown(){
        setIsShopOpen(prev => !prev)
    }

  return (
    <header className="bg-gray-300">
      <div className="flex items-center justify-between">
        <Link to="/">
          {" "}
          <img
            src="/assets/logos/LuxaristLogo.png"
            alt="LuxaristLogo"
            className="h-14"
          />
        </Link>
        <nav>
          <ul className="flex items-center gap-10">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/collections">Collections</Link>
            </li>
            <li className="relative group">
              <button 
              onClick={handleDropDown}
              className="flex items-center cursor-pointer">
                Shop
                <svg className="w-3 h-3 ml-1" viewBox="0 0 20 20">
                  <path d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.08 1.04l-4.25 4.25a.75.75 0 01-1.06 0L5.21 8.27a.75.75 0 01.02-1.06z" />
                </svg>
              </button>
              {isShopOpen && (
              <ul className="absolute left-0 mt-2 bg-white shadow-lg rounded-md px-5 py-4">
                {categories.map(([label, slug]) => (
                  <li key={slug}>
                    <Link to={`/collections/${slug}`}>{label}</Link>
                  </li>
                ))}
              </ul>
              )}
            </li>
          </ul>
        </nav>

        <div className="flex items-center gap-4">
          <button aria-label="Toggle cart">
            <img
              src="/assets/icons/icon-cart.svg"
              alt="cart"
              className="h-6 w-6"
            />
          </button>

          <button aria-label="Open profile">
            <img
              src="/assets/icons/Profile.png"
              alt="profile"
              className="h-6 w-6"
            />
          </button>
        </div>
      </div>
    </header>
  );
}