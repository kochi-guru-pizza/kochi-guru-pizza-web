"use client";

import React, { useState, useRef, useEffect } from "react";
import ReactDOM from "react-dom";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent
} from "framer-motion";
import { useAuth } from "@contexts/AuthContext";
import {
  Menu,
  X,
  User,
  ShoppingBag,
  LayoutDashboard,
  LogOut,
  ChevronDown,
  Sun,
  Moon,
  Monitor
} from "lucide-react";
import { useTheme } from "@contexts/ThemeContext";

const Header: React.FC = () => {
  const { user, logout, loading } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isThemeExpanded, setIsThemeExpanded] = useState(false);

  // Portal-based dropdown positioning
  const dropdownButtonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuButtonRef = useRef<HTMLButtonElement>(null);
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0 });

  // Recompute dropdown position whenever it opens
  useEffect(() => {
    if (dropdownOpen && dropdownButtonRef.current) {
      const rect = dropdownButtonRef.current.getBoundingClientRect();
      setDropdownPos({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
    }
  }, [dropdownOpen]);

  // Close dropdown on outside click
  useEffect(() => {
    if (!dropdownOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        dropdownButtonRef.current &&
        !dropdownButtonRef.current.contains(e.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [dropdownOpen]);

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = (e: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target as Node) &&
        mobileMenuButtonRef.current &&
        !mobileMenuButtonRef.current.contains(e.target as Node)
      ) {
        setMobileMenuOpen(false);
        setIsThemeExpanded(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [mobileMenuOpen]);

  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);
  const lastYRef = React.useRef(0);
  const directionRef = React.useRef<"up" | "down">("up");
  const lastScrollYRef = React.useRef(0); // Track previous scroll position for direction detection

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Never hide the header while the mobile menu is open
    if (dropdownOpen || mobileMenuOpen) return;

    const currentScrollY = latest;
    const previousScrollY = lastScrollYRef.current;

    // Determine current direction
    const currentDirection = currentScrollY > previousScrollY ? "down" : "up";

    // Update last scroll position
    lastScrollYRef.current = currentScrollY;

    // Check if direction changed
    if (currentDirection !== directionRef.current) {
      directionRef.current = currentDirection;
      lastYRef.current = currentScrollY; // Reset anchor point on direction change
    }

    // Always show at the top
    if (currentScrollY < 64) {
      setIsVisible(true);
      return;
    }

    // Caclulate delta from the anchor point (lastXRef)
    const delta = Math.abs(currentScrollY - lastYRef.current);

    if (currentDirection === "down" && delta > 100) {
      setIsVisible(false);
    } else if (currentDirection === "up" && delta > 50) {
      setIsVisible(true);
    }
  });

  return (
    <>
      <div className="h-16 w-full" />
      <motion.header
        initial={{ y: 0 }}
        animate={{ y: isVisible || mobileMenuOpen ? 0 : "-100%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed top-0 left-0 right-0 h-16 w-full z-50 bg-white/75 dark:bg-gray-900/75 backdrop-blur-lg border-b border-white/20 dark:border-gray-800 shadow-sm dark:shadow-gray-900/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-10 h-10 transition-transform group-hover:scale-105 duration-300">
                <Image
                  src="/logo.svg"
                  alt="Kochi Guru Pizza"
                  fill
                  className="object-contain dark:hidden"
                />
                <Image
                  src="/logo.svg"
                  alt="Kochi Guru Pizza"
                  fill
                  className="object-contain hidden dark:block"
                />
              </div>
              <span className="text-xl font-bold text-orange-600 dark:text-orange-500 tracking-tight">
                Kochi Guru Pizza
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 font-medium transition-colors"
              >
                Contact
              </Link>
            </nav>

            {/* Auth Section */}
            <div className="hidden md:flex items-center gap-4">
              {!loading ? (
                user ? (
                  <div className="relative">
                    <button
                      ref={dropdownButtonRef}
                      onClick={() => {
                        if (!dropdownOpen && dropdownButtonRef.current) {
                          const rect =
                            dropdownButtonRef.current.getBoundingClientRect();
                          setDropdownPos({
                            top: rect.bottom + 8,
                            right: window.innerWidth - rect.right
                          });
                        }
                        setDropdownOpen(!dropdownOpen);
                      }}
                      className="flex items-center gap-2 hover:opacity-80 transition py-1 px-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                      {user.profilePicture ? (
                        <Image
                          src={user.profilePicture}
                          alt={user.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover ring-1 ring-orange-100 dark:ring-orange-900/20"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center ring-2 ring-orange-100 dark:ring-orange-900/20">
                          <User className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                        </div>
                      )}
                      <span className="text-gray-700 dark:text-gray-200 font-medium text-sm">
                        {user.name}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                    </button>

                    {typeof window !== "undefined" &&
                      ReactDOM.createPortal(
                        <AnimatePresence>
                          {dropdownOpen && (
                            <motion.div
                              ref={dropdownRef}
                              initial={{ opacity: 0, scale: 0.95, y: -4 }}
                              animate={{ opacity: 1, scale: 1, y: 0 }}
                              exit={{ opacity: 0, scale: 0.95, y: -4 }}
                              transition={{ duration: 0.2, ease: "easeOut" }}
                              style={{
                                top: dropdownPos.top,
                                right: dropdownPos.right
                              }}
                              className="fixed w-56 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 py-2 overflow-hidden ring-1 ring-black/5 dark:ring-white/5 z-1000"
                            >
                              <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800 mb-1">
                                <p className="text-sm font-semibold text-gray-900 dark:text-white truncate">
                                  {user.name}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                                  {user.email}
                                </p>
                              </div>
                              <Link
                                href="/orders"
                                onClick={() => setDropdownOpen(false)}
                                className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
                              >
                                <ShoppingBag className="w-4 h-4" />
                                My Orders
                              </Link>
                              {(user.role === "admin" ||
                                user.role === "staff") && (
                                <Link
                                  href="/dashboard"
                                  onClick={() => setDropdownOpen(false)}
                                  className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-700 dark:hover:text-orange-400 transition-colors"
                                >
                                  <LayoutDashboard className="w-4 h-4" />
                                  Dashboard
                                </Link>
                              )}
                              <div className="h-px bg-gray-100 dark:bg-gray-800 my-1" />
                              <button
                                onClick={() => {
                                  logout();
                                  setDropdownOpen(false);
                                }}
                                className="w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors bg-transparent border-none text-left"
                              >
                                <LogOut className="w-4 h-4" />
                                Logout
                              </button>
                            </motion.div>
                          )}
                        </AnimatePresence>,
                        document.body
                      )}
                  </div>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="px-5 py-2.5 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-500 font-semibold transition-colors text-sm"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold rounded-full shadow-lg shadow-orange-500/20 transition-all hover:shadow-orange-500/30 text-sm"
                    >
                      Sign Up
                    </Link>
                  </>
                )
              ) : (
                <div className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 animate-pulse ring-2 ring-gray-50 dark:ring-gray-800" />
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              ref={mobileMenuButtonRef}
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                setIsThemeExpanded(false);
              }}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100/75 dark:hover:bg-gray-800/75 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            ref={mobileMenuRef}
            initial={{ opacity: 0, y: -10 }}
            animate={{
              opacity: 1,
              y: isVisible || mobileMenuOpen ? 0 : "-100%"
            }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed top-16 left-0 w-full md:hidden border-t border-gray-100 dark:border-gray-800 bg-white/75 dark:bg-gray-900/75 backdrop-blur-lg shadow-lg z-40 overflow-y-auto max-h-[calc(100vh-4rem)]"
          >
            <nav className="px-4 py-6 space-y-1">
              <Link
                href="/"
                className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-600 dark:hover:text-orange-500 rounded-xl transition-colors"
              >
                Home
              </Link>
              <Link
                href="/menu"
                className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-600 dark:hover:text-orange-500 rounded-xl transition-colors"
              >
                Menu
              </Link>
              <Link
                href="/about"
                className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-600 dark:hover:text-orange-500 rounded-xl transition-colors"
              >
                About
              </Link>
              <Link
                href="/contact"
                className="block px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-600 dark:hover:text-orange-500 rounded-xl transition-colors"
              >
                Contact
              </Link>

              <div className="h-px bg-gray-100 dark:bg-gray-800 my-4 mx-4" />

              {!loading ? (
                user ? (
                  <>
                    <div className="px-4 py-2 flex items-center gap-3 mb-2">
                      {user.profilePicture ? (
                        <Image
                          src={user.profilePicture}
                          alt={user.name}
                          width={40}
                          height={40}
                          className="w-10 h-10 rounded-full object-cover ring-1 ring-orange-100 dark:ring-orange-900/20"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center ring-2 ring-orange-100 dark:ring-orange-900/20">
                          <User className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                        </div>
                      )}
                      <div>
                        <p className="text-sm font-bold text-gray-900 dark:text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {user.email}
                        </p>
                      </div>
                    </div>

                    <Link
                      href="/orders"
                      className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-600 dark:hover:text-orange-500 rounded-xl transition-colors"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      My Orders
                    </Link>
                    {(user.role === "admin" || user.role === "staff") && (
                      <Link
                        href="/dashboard"
                        className="flex items-center gap-3 px-4 py-3 text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-orange-50 dark:hover:bg-orange-900/10 hover:text-orange-600 dark:hover:text-orange-500 rounded-xl transition-colors"
                      >
                        <LayoutDashboard className="w-5 h-5" />
                        Dashboard
                      </Link>
                    )}

                    <button
                      onClick={logout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-base font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-xl transition-colors text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </>
                ) : (
                  <div className="p-4 grid gap-3">
                    <Link
                      href="/login"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-xl transition-colors"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center justify-center w-full px-4 py-3 text-base font-semibold text-white bg-orange-600 hover:bg-orange-700 rounded-xl shadow-lg shadow-orange-500/20 transition-all"
                    >
                      Sign Up
                    </Link>
                  </div>
                )
              ) : (
                <div className="py-4 px-4 text-center text-gray-500 dark:text-gray-400">
                  <div className="w-8 h-8 mx-auto border-2 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              )}

              {/* Mobile Theme Toggle Button */}
              <div className="pt-2 mt-2 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setIsThemeExpanded(!isThemeExpanded)}
                  className="w-full flex items-center justify-between px-4 py-3 text-gray-700 dark:text-gray-300 hover:bg-gray-50/75 dark:hover:bg-gray-800/75 rounded-xl transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gray-100/25 dark:bg-gray-800/25">
                      {theme === "dark" ? (
                        <Moon className="w-5 h-5 text-gray-700 dark:text-gray-300" />
                      ) : theme === "light" ? (
                        <Sun className="w-5 h-5 text-orange-500" />
                      ) : (
                        <Monitor className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      )}
                    </div>
                    <span className="font-medium">Appearance</span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 transition-transform duration-200 ${isThemeExpanded ? "rotate-180" : ""}`}
                  />
                </button>

                {/* Expanded Theme Options */}
                <AnimatePresence>
                  {isThemeExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2, ease: "easeInOut" }}
                      className="space-y-1 overflow-hidden mt-1 px-4 pb-2"
                    >
                      <button
                        onClick={() => setTheme("light")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          theme === "light"
                            ? "bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-500"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }`}
                      >
                        <Sun className="w-4 h-4" />
                        Light
                      </button>
                      <button
                        onClick={() => setTheme("dark")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          theme === "dark"
                            ? "bg-gray-800 text-white"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }`}
                      >
                        <Moon className="w-4 h-4" />
                        Dark
                      </button>
                      <button
                        onClick={() => setTheme("system")}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                          theme === "system"
                            ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-500"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800/50"
                        }`}
                      >
                        <Monitor className="w-4 h-4" />
                        System
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
