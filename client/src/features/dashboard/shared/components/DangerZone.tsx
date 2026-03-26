import { useState } from "react";
import { Loader2 } from "lucide-react";
import { useAuth } from "../../../../context/AuthContext";

const API_URL = import.meta.env.DEV ? "http://localhost:3000/api" : import.meta.env.VITE_API_URL;

export default function DangerZone() {
    const { token, logout } = useAuth();
    const [confirming, setConfirming] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete account");
            logout(); // clears context + localStorage, redirects to /login
        } catch (err: any) {
            setError(err.message);
            setLoading(false);
        }
    };

    return (
        <section className="border border-red-50 rounded-[2.5rem] p-8 bg-red-50/10">
            <h3 className="text-sm font-bold text-red-900 mb-2">Danger Zone</h3>
            <p className="text-xs text-red-600/60 mb-6">Permanently delete your account and all associated data.</p>

            {!confirming ? (
                <button
                    onClick={() => setConfirming(true)}
                    className="px-6 py-3 border border-red-200 text-red-600 rounded-2xl text-[10px] uppercase tracking-widest font-black hover:bg-red-50 transition-all"
                >
                    Delete Account
                </button>
            ) : (
                <div className="space-y-4">
                    <p className="text-sm text-red-700 font-medium">Are you sure? This cannot be undone.</p>
                    <div className="flex gap-3">
                        <button
                            onClick={handleDelete}
                            disabled={loading}
                            className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white text-[10px] uppercase tracking-widest font-black rounded-2xl hover:bg-red-700 transition-all disabled:opacity-50"
                        >
                            {loading && <Loader2 size={12} className="animate-spin" />}
                            {loading ? "Deleting..." : "Yes, Delete My Account"}
                        </button>
                        <button
                            onClick={() => setConfirming(false)}
                            className="px-6 py-3 border border-stone-200 text-stone-500 rounded-2xl text-[10px] uppercase tracking-widest font-black hover:bg-stone-50 transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                    {error && <p className="text-red-500 text-xs italic">{error}</p>}
                </div>
            )}
        </section>
    );
}