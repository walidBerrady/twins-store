import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">About Us</h3>
            <p className="text-sm">
              Parfum is your destination for luxury fragrances. Discover your signature scent today.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/fragrances" className="text-sm hover:text-gray-300">
                  Fragrances
                </Link>
              </li>
              <li>
                <Link href="/brands" className="text-sm hover:text-gray-300">
                  Brands
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:text-gray-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:text-gray-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="text-sm hover:text-gray-300">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm hover:text-gray-300">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-sm hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-sm hover:text-gray-300">
                  Terms & Conditions
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </a>
              
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Parfum. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

