"use client";
import { useState } from "react";
import Logo from "./logo";
import NavLinks from "./Navlinks";
import ProfileLink from "./profile";
import LanguageDropdown from "./language";
import { useLanguage } from "../../hooks/languagehook";
export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { language, changeLanguage } = useLanguage();

  const closeMenu = () => setMobileOpen(false);

  return (
    <nav className="text-white w-full bg-black shadow px-6 py-3 sticky top-0 z-50">
      <div className="text-black container mx-auto flex items-center justify-between">
        {/* Left side Logo */}
        <Logo />

        {/* Desktop menu */}
        <div className="hidden md:flex space-x-6 items-center">
          <NavLinks closeMenu={closeMenu} />
          <LanguageDropdown language={language} changeLanguage={changeLanguage} />
          
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-blue-900"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <svg
            width="24"
            height="24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 7h16M4 12h16M4 17h16" />
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-black shadow-lg py-4 px-6 flex flex-col space-y-4">
          <NavLinks closeMenu={closeMenu} />
          <LanguageDropdown language={language} changeLanguage={changeLanguage} />
          
        </div>
      )}
    </nav>
  );
}
