"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/Loginform";


export default function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (

      <div className="flex justify-center relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className= "bg-black w-full text-yellow-400 px-4 py-1 cursor-pointer hover:bg-yellow-400 hover:text-black"
        >
         Login
        </button>

        {isOpen && (
          <div
              className="
              absolute left-1/2 top-full z-50 mt-2 w-[calc(100vw-2rem)] max-w-sm -translate-x-1/2
              rounded-lg border border-yellow-400 bg-white p-6 shadow-xl md:left-auto md:right-0 md:w-80 md:translate-x-0">
            <LoginForm />
          </div>
        )}
      </div>
  );
}