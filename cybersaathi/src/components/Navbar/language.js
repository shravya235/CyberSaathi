"use client";
import { useState } from "react";

export default function LanguageDropdown({ language, changeLanguage }) {
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "hi", label: "Hindi" },
    { code: "en", label: "English" },
    { code: "kn", label: "Kannada" },
  ];

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="px-3 py-2 bg-blue-700 text-white rounded hover:bg-blue-600"
        aria-haspopup="true"
        aria-expanded={open}
      >
        {languages.find((l) => l.code === language)?.label || "Language"}
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-36 bg-white border border-gray-200 rounded shadow-lg z-50">
          {languages.map(({ code, label }) => (
            <li key={code}>
              <button
                onClick={() => {
                  changeLanguage(code);
                  setOpen(false);
                }}
                className={`block w-full px-4 py-2 hover:bg-blue-100 text-left ${
                  language === code ? "font-bold" : ""
                }`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
