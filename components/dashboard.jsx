"use client";
import { useState, useEffect, useMemo, useRef } from 'react';
import Link from 'next/link';
import {
  ChartBarIcon,
  Cog6ToothIcon,
  DocumentChartBarIcon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
  ArrowLeftEndOnRectangleIcon,
  MagnifyingGlassIcon,
  Squares2X2Icon,
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

// Utility: Debounce function to limit resize event frequency
const debounce = (func, wait) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
};


const DashboardLayout = ({ children,current,code }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);
const router = useRouter();
  // Memoized navigation array to prevent re-creation on render
  const navigation = useMemo(
    () => [
      { name: 'Dashboard', href: '/dashboard', icon: Squares2X2Icon, current: current },
      { name: 'Code', href: '/code', icon: ChartBarIcon, current: code},
      { name: 'Projects', href: '/dashboard/projects', icon: DocumentChartBarIcon, current: false },
      { name: 'Settings', href: '/dashboard/settings', icon: Cog6ToothIcon, current: false },
    ],
    []
  );
  async function logout(){
   await fetch("api/login",{
        method:"GET",
    })
router.refresh();
  }
  // Handle window resize with debouncing
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      setSidebarOpen(!mobile);
    };

    const debouncedCheckMobile = debounce(checkMobile, 200);
    debouncedCheckMobile();
    window.addEventListener('resize', debouncedCheckMobile);

    return () => window.removeEventListener('resize', debouncedCheckMobile);
  }, []);

  // Initialize theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setDarkMode(savedTheme === 'dark');
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  // Toggle theme and persist to localStorage
  const toggleTheme = () => {
    setDarkMode((prev) => {
      const newMode = !prev;
      localStorage.setItem('theme', newMode ? 'dark' : 'light');
      document.documentElement.classList.toggle('dark', newMode);
      return newMode;
    });
  };

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="flex relative">
        {/* Mobile sidebar backdrop */}
        {isMobile && sidebarOpen && (
          <div
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-hidden="true"
          />
        )}

        {/* Sidebar */}
        <aside
          className={`fixed z-50 h-screen w-64 transition-transform duration-300 ease-in-out shadow-lg
            ${darkMode ? 'bg-gradient-to-b from-gray-800 to-gray-900' : 'bg-white'}
            ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
        >
          <div className="h-full px-4 py-6 flex flex-col">
            <div className="flex items-center justify-between mb-8 px-2">
              <span className={`text-2xl font-bold tracking-tight ${darkMode ? 'text-white' : 'text-gray-800'}`}>
              API MANAGEMENT
              </span>
              {isMobile && (
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                  aria-label="Close sidebar"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              )}
            </div>
            <nav className="flex-1">
              <ul className="space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link href={item.href}>
                      <h1
                        className={`flex items-center p-3 rounded-xl text-sm font-medium transition-colors duration-200
                          ${
                            item.current
                              ? darkMode
                                ? 'bg-indigo-600 text-white'
                                : 'bg-indigo-100 text-indigo-700'
                              : darkMode
                              ? 'text-gray-300 hover:bg-gray-700'
                              : 'text-gray-600 hover:bg-gray-100'
                          }`}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <item.icon className="w-5 h-5 mr-3" />
                        {item.name}
                      </h1>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-64 transition-all duration-300">
          {/* Navbar */}
          <nav
            className={`fixed w-full md:w-[calc(100%-16rem)] z-40 border-b
              ${darkMode ? 'bg-gray-800/95 backdrop-blur-md' : 'bg-white/95 backdrop-blur-md'}`}
          >
            <div className="px-4 py-3 lg:px-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                    className={`p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden
                      ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                    aria-label="Toggle sidebar"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                  <div className="relative">
                    <MagnifyingGlassIcon
                      className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5
                        ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
                    />
                    <input
                      type="text"
                      className={`w-48 md:w-64 pl-10 pr-4 py-2 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500
                        ${darkMode ? 'bg-gray-700 text-white placeholder-gray-400' : 'bg-gray-100 text-gray-900 placeholder-gray-500'}`}
                      placeholder="Search..."
                      aria-label="Search dashboard"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleTheme}
                    className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200
                      ${darkMode ? 'text-yellow-400' : 'text-gray-600'}`}
                    aria-label={`Switch to ${darkMode ? 'light' : 'dark'} mode`}
                  >
                    {darkMode ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
                  </button>
                  <div className="relative" ref={profileRef}>
                    <button
                      onClick={() => setProfileOpen((prev) => !prev)}
                      className="flex items-center rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      aria-expanded={profileOpen}
                      aria-label="User profile"
                    >
                      <UserCircleIcon
                        className={`w-8 h-8 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}
                      />
                    </button>
                    {profileOpen && (
                      <div
                        className={`absolute right-0 mt-2 w-56 rounded-xl shadow-xl border overflow-hidden
                          ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
                          animate-in fade-in slide-in-from-top-2 duration-200`}
                      >
                        <div className="px-4 py-3 border-b dark:border-gray-700">
                          <p className={`text-sm font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            John Doe
                          </p>
                          <p className={`text-xs truncate ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            john@example.com
                          </p>
                        </div>
                        <button
                          onClick={logout} // Replace with actual logout logic
                          className={`flex items-center w-full px-4 py-2 text-sm text-left
                            ${darkMode ? 'text-gray-300 hover:bg-gray-700' : 'text-gray-700 hover:bg-gray-100'}
                            transition-colors duration-150`}
                        >
                          < ArrowLeftEndOnRectangleIcon className="w-5 h-5 mr-2" />
                          Sign out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </nav>

          {/* Content Area */}
          <div className="p-6 mt-16 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
};



export default DashboardLayout;