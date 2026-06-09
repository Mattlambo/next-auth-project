"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function LoginForm() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // Added 'async' here so you can use 'await' inside
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please fill out all fields");
            return;
        }
        try {
            const response = await fetch("/api/auth/login", {
                method: "POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({email, password}),
            });
            const data = await response.json();
            if (!response.ok) {
                setError(data.error || "Login failed");
                return;
            }
            router.push("/account");
        } catch (err) {
            setError("Failed to connect to server");
        }

    }

    // Moved the return outside of handleSubmit so the component renders correctly
    return (
        /* We removed the positioning margins so it fits perfectly anywhere */
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-60 ml-auto mr-5">
            <h3>Login</h3>

            {error && <p className="rounded bg-red-100 p-2 text-red-700 text-sm">{error}</p>}

            <div className="flex flex-col gap-2">
                <label htmlFor="email" className="text-sm font-medium text-gray-700">Email</label>
                <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="rounded border border-gray-300 p-2 text-black text-sm focus:outline-black"
                    placeholder="email@example.com"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">Password</label>
                <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    className="rounded border border-gray-300 p-2 text-black text-sm focus:outline-black"
                    placeholder="••••••••"
                />
            </div>

            <button
                type="submit"
                className="rounded bg-black p-2 text-yellow-400 font-medium hover:bg-gray-800 mt-2 transition-colors"
            >
                Log In
            </button>
        </form>
    );
}