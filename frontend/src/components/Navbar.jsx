"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, Search, ShoppingBag, User } from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false) 
  const [basketItemsCount, setBasketItemsCount] = useState(0) 

  const toggleLogin = () => {
    setIsLoggedIn(!isLoggedIn) 
  }

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center space-x-4">
            <Link href="/" className="flex items-center">
              <span className="font-semibold text-gray-500 text-lg">TWINS FREGRANCE</span>
            </Link>
            <div className="hidden md:flex items-center space-x-1">
              <Link href="/" className="py-2 px-3 text-gray-500 hover:text-gray-900">
                Home
              </Link>
              <Link href="/fragrances" className="py-2 px-3 text-gray-500 hover:text-gray-900">
                Fragrance categories
              </Link>
              <Link href="/brands" className="py-2 px-3 text-gray-500 hover:text-gray-900">
                Brands
              </Link>
              <Link href="/about" className="py-2 px-3 text-gray-500 hover:text-gray-900">
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="relative hidden md:block">
              <input
                type="text"
                placeholder="Search perfumes..."
                className="bg-gray-100 rounded-full py-2 px-4 pl-10 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            <button onClick={toggleLogin} className="text-gray-500 hover:text-gray-900">
              <User className="h-6 w-6" />
              <span className="sr-only">{isLoggedIn ? "Logout" : "Login"}</span>
            </button>

            <Link href="/basket" className="text-gray-500 hover:text-gray-900 relative">
              <ShoppingBag className="h-6 w-6" />
              {basketItemsCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {basketItemsCount}
                </span>
              )}
              <span className="sr-only">Basket</span>
            </Link>

            <button className="md:hidden outline-none" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X className="h-6 w-6 text-gray-500" /> : <Menu className="h-6 w-6 text-gray-500" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block px-3 py-2 text-gray-500 hover:bg-gray-200">
              Home
            </Link>
            <Link href="/fragrances" className="block px-3 py-2 text-gray-500 hover:bg-gray-200">
              Fragrances
            </Link>
            <Link href="/brands" className="block px-3 py-2 text-gray-500 hover:bg-gray-200">
              Brands
            </Link>
            <Link href="/about" className="block px-3 py-2 text-gray-500 hover:bg-gray-200">
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
        </div>
      )}
    </nav>
  )
}

export default Navbar

