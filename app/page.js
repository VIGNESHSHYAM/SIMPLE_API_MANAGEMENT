"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  SunIcon,
  MoonIcon,
  UserCircleIcon,
  ArrowDownTrayIcon,
  BookOpenIcon,
  LifebuoyIcon,
  CodeBracketIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";

const GetStartedDashboard = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Theme initialization and persistence
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Handle clicks outside the dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem("theme", newMode ? "dark" : "light");
      document.documentElement.classList.toggle("dark");
      return newMode;
    });
  };

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Navbar */}
      <nav className="bg-white dark:bg-gray-800 border-b dark:border-gray-700">
        <div className="px-4 py-3 mx-auto max-w-7xl">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <span className="text-xl font-semibold text-gray-700 dark:text-white">
                API MANAGEMENT
              </span>
            </Link>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                title="Toggle theme"
              >
                {darkMode ? (
                  <SunIcon className="w-6 h-6 text-yellow-400" />
                ) : (
                  <MoonIcon className="w-6 h-6 text-gray-600" />
                )}
              </button>
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setProfileOpen((prev) => !prev)}
                  className="flex items-center rounded-full focus:outline-none"
                >
                  <UserCircleIcon className="w-8 h-8 text-gray-600 dark:text-gray-300" />
                </button>
                <div
                  className={`absolute right-0 mt-2 w-48 origin-top-right rounded-md shadow-lg overflow-hidden bg-white dark:bg-gray-700 transition-all duration-300 ease-in-out ${
                    profileOpen ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                  }`}
                >
                  <div className="px-4 py-3 text-sm">
                    <p className="text-gray-900 dark:text-white">John Doe</p>
                    <p className="truncate text-gray-500 dark:text-gray-400">
                      john@example.com
                    </p>
                  </div>
                  <div className="border-t dark:border-gray-600">
                    <button
                      onClick={() => {
                        /* Add logout logic here */
                      }}
                      className="block w-full px-4 py-2 text-sm text-left text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
            Get started with API MANAGEMENT
          </h1>
          <p className="text-base sm:text-lg text-gray-600 dark:text-gray-400">
            Start coding with the most popular open-source library of interactive UI components
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Quick Start Card */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow transition-transform duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <CodeBracketIcon className="w-8 h-8 text-purple-600 dark:text-purple-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Quick start</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Get started by installing API MANAGEMENT via NPM or CDN and start building your application
            </p>
            <div className="space-y-3">
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                <span>Install via NPM</span>
                <ArrowDownTrayIcon className="w-5 h-5" />
              </button>
              <button className="w-full flex items-center justify-between px-4 py-2 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                <span>Include via CDN</span>
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Documentation Card */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow transition-transform duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <BookOpenIcon className="w-8 h-8 text-blue-600 dark:text-blue-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Documentation</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Learn how to use API MANAGEMENT components and customize them to match your design
            </p>
            <Link
              href="/dashboard"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors duration-200"
            >
              Browse documentation
              <ChevronRightIcon className="w-4 h-4 ml-1" />
            </Link>
          </div>

          {/* Community Card */}
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow transition-transform duration-300 hover:scale-105">
            <div className="flex items-center mb-4">
              <LifebuoyIcon className="w-8 h-8 text-green-600 dark:text-green-400 mr-3" />
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Community</h3>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Join our community of developers and get help when you need it
            </p>
            <div className="flex space-x-4">
              <button className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                GitHub
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                Discord
              </button>
              <button className="px-3 py-1 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                Twitter
              </button>
            </div>
          </div>
        </div>

        {/* Additional Content Sections */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Starter guides</h3>
            <ul className="space-y-3">
              <li className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                <span className="text-gray-900 dark:text-white">Frameworks guide</span>
                <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-300" />
              </li>
              <li className="flex items-center justify-between p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200">
                <span className="text-gray-900 dark:text-white">Design system</span>
                <ChevronRightIcon className="w-5 h-5 text-gray-400 dark:text-gray-300" />
              </li>
            </ul>
          </div>

          <div className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">Resources</h3>
            <div className="flex flex-wrap gap-3">
              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                Components
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                Blocks
              </button>
              <button className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors duration-200">
                Templates
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default GetStartedDashboard;