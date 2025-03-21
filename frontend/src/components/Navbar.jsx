import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Search,
  ShoppingBag,
  LogIn,
  UserPlus,
  LogOut,
} from "lucide-react";
import { useUserStore } from "../store/useUserStore";
import { useCartStore } from "../store/useCartStore";

const Navbar = () => {
  const { user, logout } = useUserStore();
  const { cart } = useCartStore();
  const [isOpen, setIsOpen] = useState(false);
  const [basketItemsCount, setBasketItemsCount] = useState(0);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const linkClass = (path) =>
    `py-2 px-3 ${
      isActive(path)
        ? "text-blue-600 font-semibold"
        : "text-gray-500 hover:text-gray-900"
    }`;

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center">
              <span className="font-semibold text-gray-500 text-lg">
                TWINS FRAGRANCE
              </span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className={linkClass("/")}>
                Home
              </Link>
              <Link to="/homme" className={linkClass("/homme")}>
                Homme
              </Link>
              <Link to="/femme" className={linkClass("/femme")}>
                Femme
              </Link>
              <Link to="/about" className={linkClass("/about")}>
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  onClick={logout}
                  className={`flex items-center ${linkClass("/logout")}`}
                >
                  <LogOut className="h-6 w-6 mr-1" />
                  <span className="hidden md:inline">Logout</span>
                </button>
                <Link
                  to="/basket"
                  className={`relative ${linkClass("/basket")}`}
                >
                  <ShoppingBag className="h-6 w-6" />

                  {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                      {cart.length}
                    </span>
                  )}

                  <span className="sr-only">Basket</span>
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`flex items-center ${linkClass("/login")}`}
                >
                  <LogIn className="h-6 w-6 mr-1" />
                  <span className="hidden md:inline">Login</span>
                </Link>
                <Link
                  to="/signup"
                  className={`flex items-center ${linkClass("/signup")}`}
                >
                  <UserPlus className="h-6 w-6 mr-1" />
                  <span className="hidden md:inline">Sign Up</span>
                </Link>
              </>
            )}

            <button
              className="md:hidden outline-none"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-500" />
              ) : (
                <Menu className="h-6 w-6 text-gray-500" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className={`block px-3 py-2 ${linkClass("/")}`}>
              Home
            </Link>
            <Link
              to="/homme"
              className={`block px-3 py-2 ${linkClass("/homme")}`}
            >
              Homme
            </Link>
            <Link
              to="/femme"
              className={`block px-3 py-2 ${linkClass("/femme")}`}
            >
              Femme
            </Link>
            <Link
              to="/about"
              className={`block px-3 py-2 ${linkClass("/about")}`}
            >
              About
            </Link>
          </div>
          <div className="px-4 py-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search perfumes..."
                className="w-full bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
          {!user && (
            <div className="px-4 py-3 space-y-2">
              <Link
                to="/login"
                className={`block py-2 px-3 rounded-md ${linkClass("/login")}`}
              >
                <LogIn className="h-5 w-5 inline-block mr-2" />
                Login
              </Link>
              <Link
                to="/signup"
                className={`block py-2 px-3 rounded-md ${linkClass("/signup")}`}
              >
                <UserPlus className="h-5 w-5 inline-block mr-2" />
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
