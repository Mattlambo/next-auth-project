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
            className="bg-black rounded text-white px-3 py-1 m-2 text-base hover:bg-white hover:text-black"
        >
            Logout
        </button>
    );
}