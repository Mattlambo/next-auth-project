"use client";

import { useState } from "react";
import LoginForm from "./Login";


export default function LoginDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (

    <div className="flex w-full justify-end">
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black text-yellow-400 px-3 py-1 rounded text-base hover:bg-neutral-50 hover:text-black mt-2 mb-2"
        >
          Log in
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-white p-6 shadow-xl rounded-lg border border-gray-100">
            <LoginForm />
          </div>
        )}
      </div>
    </div>
  );
}