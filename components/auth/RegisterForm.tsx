"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterForm() {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (
      !name.trim() ||
      !email.trim() ||
      !password ||
      !confirm
    ) {
      setError("Please fill out all fields");
      return;
    }

    if (confirm !== password) {
      setError("Passwords don't match. Try again");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
      }

      router.push("/account");
      router.refresh();

    } catch {
      setError("Unable to connect to the server");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex w-60 flex-col gap-4 bg-white pb-3 text-black"
    >
      {error && (
        <p className="rounded bg-red-100 p-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <div className="flex flex-col gap-2">
        <label
          htmlFor="name"
          className="text-sm font-medium text-black"
        >
          User Name
        </label>

        <input
          id="name"
          type="text"
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="rounded border border-gray-300 bg-white p-2 text-sm text-black focus:outline-black"
          placeholder="*******"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="email"
          className="text-sm font-medium text-black"
        >
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="rounded border border-gray-300 bg-white p-2 text-sm text-black focus:outline-black"
          placeholder="email@example.com"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="password"
          className="text-sm font-medium text-black"
        >
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="rounded border border-gray-300 bg-white p-2 text-sm text-black focus:outline-black"
          placeholder="••••••••"
        />
      </div>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="confirm"
          className="text-sm font-medium text-black"
        >
          Confirm Password
        </label>

        <input
          id="confirm"
          type="password"
          value={confirm}
          onChange={(event) => setConfirm(event.target.value)}
          className="rounded border border-gray-300 bg-white p-2 text-sm text-black focus:outline-black"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="mt-2 rounded border border-yellow-400 bg-black p-2 font-medium text-yellow-400 transition-colors hover:bg-gray-800"
      >
        Register
      </button>
    </form>
  );
}