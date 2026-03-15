import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "../../features/auth/components/RegisterForm";
import { registerUser } from "../../features/auth/services/authApi";
import type { RegisterFormData } from "../../features/auth/types";

export default function RegisterPage() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<'login' | 'register'>('register');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    async function handleRegister(data: RegisterFormData) {
        setIsLoading(true);
        setError(null);
        try {
            const result = await registerUser(data);
            localStorage.setItem("token", result.token);
            navigate("/shop");
        } catch(err: any) {
            // Axios error messages usually live in err.response.data.message
            setError(err.response?.data?.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    }
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f9f9f9] py-12 px-6">
            {/* Main Card Container */}
            <div className="max-w-112.5 w-full bg-white rounded-4xl shadow-sm border border-gray-100 p-10 relative">
                
                {/* Optional: Close button like the screenshot */}
                <button className="absolute right-8 top-8 text-gray-300 hover:text-gray-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>

                {/* Branding */}
                <div className="mb-8">
                    <h2 className="text-center text-2xl font-light tracking-[0.2em] text-gray-900 uppercase">
                        LUXARIST
                    </h2>
                </div>

                {/* Tab Selector (The Pill) */}
                <div className="bg-[#f3f3f3] p-1 rounded-full flex mb-10">
                    <button
                        onClick={() => setActiveTab('login')}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-full transition-all ${
                            activeTab === 'login' 
                                ? 'bg-white text-black shadow-sm' 
                                : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        Login
                    </button>
                    <button
                        onClick={() => setActiveTab('register')}
                        className={`flex-1 py-2.5 text-sm font-medium rounded-full transition-all ${
                            activeTab === 'register' 
                                ? 'bg-white text-black shadow-sm' 
                                : 'text-gray-400 hover:text-gray-600'
                        }`}
                    >
                        Register
                    </button>
                </div>

                {/* Backend Error Display */}
                {error && (
                    <div className="mb-6 bg-red-50 text-red-500 p-3 text-[10px] font-bold text-center border border-red-100 rounded-lg uppercase tracking-widest">
                        {error}
                    </div>
                )}

                {/* Form Logic */}
                {activeTab === 'register' ? (
                    <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
                ) : (
                    <div className="py-20 text-center text-gray-400 text-sm italic">
                        Login form coming soon...
                    </div>
                )}
            </div>
        </div>
    );
}