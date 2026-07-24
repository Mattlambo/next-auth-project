"use client";

import { useRouter } from "next/navigation";

export default function Logout() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", {
            method: "POST",
        });

        router.push("/");
        router.refresh();
    };

    return (
        <button
            onClick={handleLogout}
            className="cursor-pointer block w-full px-4 py-3 text-left text-yellow-400 hover:bg-yellow-400 hover:text-black focus:bg-yellow-400 focus:text-black"
        >
            Logout
        </button>
    );
}