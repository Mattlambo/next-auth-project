"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function Register() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [confirm, setConfirm] = useState("");

async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!email || !password || !confirm) {
        setError("Please fill out all fields");
        return;
    }

    if (confirm !== password) {
        setError("Passwords don't match. Try again");
        return;
    }

    const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
        setError(data.error || "Registration failed");
        return;
    }

    router.push("/account");
}


    return (

        /* We removed the positioning margins so it fits perfectly anywhere */
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-60 ml-auto mr-5">
            <h3>Register</h3>

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
                <div className="flex flex-col gap-2">
                    <label htmlFor="confirm" className="text-sm font-medium text-gray-700">Confirm Password</label>
                <input
                    id="confirm"
                    type="password"
                    value={confirm}
                    onChange={(event) => setConfirm(event.target.value)}
                    className="rounded border border-gray-300 p-2 text-black text-sm focus:outline-black"
                    placeholder="........"
                    />
            </div>
            </div>
            <button
                type="submit"
                className="rounded bg-black p-2 text-yellow-400 font-medium hover:bg-gray-800 mt-2 transition-colors"
            >
                Register
            </button>

        </form>


    );
}
