"use client";

import { useEffect, useRef, useState } from "react";

import LoginButton from "@/components/auth/LoginButton";
import RegisterButton from "@/components/auth/RegisterButton";

export default function AccountButton() {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block"
    >
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        className="cursor-pointer flex justify-center w-20 rounded border border-black px-3 py-1 text-black"
      >
        Account
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 w-30 rounded border border-black bg-black">
          <LoginButton />
          <RegisterButton />
        </div>
      )}
    </div>
  );
}