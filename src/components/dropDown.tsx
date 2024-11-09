"use client";
import { useState, useContext } from "react";
import {
  GlobalContext,
  TLangSelection,
  TLanguage,
} from "@/context/globalState";

const Dropdown = () => {
  const { setLocale, language, setLanguage } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const options = [
    { value: "id", label: "Indonesia" },
    { value: "en", label: "English" },
  ];

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  const handleUpdate = (val: TLangSelection, label: TLanguage) => {
    setLanguage(label);
    setIsOpen(!isOpen);
    setLocale(val);
  };
  return (
    <div className="relative inline-block text-left">
      <button
        type="button"
        className="inline-flex justify-center w-full px-4 py-2 bg-[#ECEFF1] text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none "
        onClick={toggleDropdown}
      >
        {language}
        <svg
          className="-mr-1 ml-2 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute z-30 right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div
            className="py-1"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() =>
                  handleUpdate(
                    option.value as TLangSelection,
                    option.label as TLanguage
                  )
                }
                className="block py-2 text-sm text-gray-700 hover:bg-gray-100 w-full"
                role="menuitem"
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
