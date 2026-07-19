"use client";

import { useState } from "react";

import AccountMenu from "@/components/auth/AccountMenu";


export default function AccountDropDown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="flex justify-center mr-auto w-20 rounded border-1 border-black bg-black px-3 py-1 text-yellow-400 hover:bg-yellow-400 hover:text-black"
      >
        User
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1">
          <AccountMenu />
        </div>
      )}
    </div>
  );
}