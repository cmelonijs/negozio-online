"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateProfile } from "@/lib/actions/user.actions";

export default function ProfileForm({ user }: { user: { name: string; email: string } }) {
    const [name, setName] = useState(user.name || "");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [message, setMessage] = useState({ type: "", text: "" });
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setMessage({ type: "", text: "" });

        try {
            const result = await updateProfile({ name, email: user.email });

            if (result.success) {
                setMessage({ type: "success", text: result.message });
                router.refresh();
            } else {
                setMessage({ type: "error", text: result.message });
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            setMessage({ type: "error", text: "An error occurred while updating profile" });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-md mx-auto p-6 bg-white dark:bg-gray-800 shadow-lg rounded-lg transition-colors">
            <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">Edit Profile</h2>

            {message.text && (
                <div className={`p-3 rounded-md mb-4 ${message.type === "success"
                        ? "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300"
                        : "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300"
                    }`}>
                    {message.text}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={user.email}
                        disabled
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md 
                     bg-gray-50 dark:bg-gray-900 text-gray-500 dark:text-gray-400
                     focus:ring-0 focus:outline-none"
                    />
                </div>

                <div>
                    <label
                        htmlFor="name"
                        className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-md 
                     bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
                     focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-600 
                     transition-colors"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-2 px-4 mt-2 rounded-md font-medium text-white 
            bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 
            focus:outline-none focus:ring-2 focus:ring-amber-500 dark:focus:ring-amber-500 
            transition-colors
            ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                    {isSubmitting ? "Updating..." : "Update Profile"}
                </button>
            </form>
        </div>
    );
}