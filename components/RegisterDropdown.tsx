"use client";

import { useState } from "react";
import Register from "@/components/Register";


export default function RegisterDropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (

    <div className="flex w-full justify-end">
      <div className="relative inline-block">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-black text-yellow-400 px-3 py-1 m-2 text-base hover:bg-white hover:text-black rounded"
        >
          Register
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-white p-6 shadow-xl rounded-lg border border-gray-100">
            <Register />
          </div>
        )}
      </div>
    </div>
  );
}