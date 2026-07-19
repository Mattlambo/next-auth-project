"use client";

import { useState } from "react";
import LoginForm from "@/components/auth/Loginform";


export default function LoginButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (

      <div className="flex justify-center relative">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className= "bg-black w-full text-yellow-400 px-4 py-1 hover:bg-yellow-400 hover:text-black"
        >
         Login
        </button>

        {isOpen && (
          <div className="absolute right-0 top-full mt-2 z-50 w-80 bg-white p-6 shadow-xl rounded-lg border border-yellow-400">
            <LoginForm />
          </div>
        )}
      </div>
  );
}