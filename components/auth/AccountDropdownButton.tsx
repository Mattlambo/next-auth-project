"use client";


import { useState } from "react";

import AccountMenu from "@/components/auth/AccountMenu";

type AccountDropDownProps = {
    name: string;
};

export default function AccountDropdownButton({name,}: AccountDropDownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative inline-block">

      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="cursor-pointer flex justify-center mr-auto min-w-20 h-8 rounded border-1 border-black bg-yellow-400 text px-3 py-1 hover:bg-black hover:text-yellow-400 "
      >
          {name}
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1">
          <AccountMenu />
        </div>
      )}
    </div>
  );
}