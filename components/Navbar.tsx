"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Eye } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md sticky top-0 z-50 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center gap-2">
              <Eye className="h-8 w-8 text-primary dark:text-accent" />
              <span className="font-bold text-xl tracking-tight text-dark dark:text-white">
                Visionary Eye Clinic
              </span>
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Home
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">
              About Us
            </Link>
            <Link href="/services" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Services
            </Link>
            <Link href="/gallery" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Gallery
            </Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Contact
            </Link>
            <ThemeToggle />
            <Link href="/book-appointment" className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-secondary transition-colors shadow-sm">
              Book Appointment
            </Link>
          </div>
          <div className="flex items-center md:hidden gap-4">
            <ThemeToggle />
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t dark:border-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link href="/" className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/about" className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
              About Us
            </Link>
            <Link href="/services" className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
              Services
            </Link>
            <Link href="/gallery" className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
              Gallery
            </Link>
            <Link href="/contact" className="block text-gray-700 dark:text-gray-300 hover:text-primary dark:hover:text-accent px-3 py-2 rounded-md text-base font-medium" onClick={toggleMenu}>
              Contact
            </Link>
            <Link href="/book-appointment" className="block w-full text-center bg-primary text-white px-4 py-2 rounded-md text-base font-medium hover:bg-secondary mt-4" onClick={toggleMenu}>
              Book Appointment
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
