import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import { loginUser, registerUser } from "../services/authApi";
import type {
  LoginFormData,
  RegisterFormData,
} from "../types";
import { AnimatePresence, motion } from "framer-motion";

interface AuthModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Close modal if user clicks the dark backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if(e.target === e.currentTarget) onClose();
  };

  async function handleRegister(data: RegisterFormData) {
    setIsLoading(true);
    setError(null);
    try {
      const result = await registerUser(data);
      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (err: any) {
      // Axios error messages usually live in err.response.data.message
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLogin(data: LoginFormData) {
    setIsLoading(true);
    setError(null);
    try {
      const result = await loginUser(data);
      localStorage.setItem("token", result.token);
      navigate("/");
    } catch (err: any) {
      // Axios error messages usually live in err.response.data.message
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AnimatePresence>
    {isOpen && (
      <div 
        className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
        onClick={handleBackdropClick}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }} // Custom "luxury" ease
          className="max-w-112.5 w-full bg-white rounded-4xl shadow-2xl p-10 relative overflow-hidden"
        >
          {/* Functional Close Button */}
          <button
            onClick={onClose}
            className="absolute right-8 top-8 text-gray-300 hover:text-gray-600 transition-colors z-20"
          >
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
          <div className="bg-[#f3f3f3] p-1 rounded-full flex mb-10 relative">
              {/* Use Framer Motion for the sliding white background */}
              <button
                  onClick={() => setActiveTab("login")}
                  className={`relative z-10 flex-1 py-2.5 text-sm font-medium transition-colors duration-300 ${
                      activeTab === "login" ? 'text-black' : 'text-gray-400'
                  }`}
              >
                  Login
                  {activeTab === "login" && (
                      <motion.div layoutId="tab-bg" className="absolute inset-0 bg-white rounded-full shadow-sm -z-10" />
                  )}
              </button>
              <button
                  onClick={() => setActiveTab("register")}
                  className={`relative z-10 flex-1 py-2.5 text-sm font-medium transition-colors duration-300 ${
                      activeTab === "register" ? 'text-black' : 'text-gray-400'
                  }`}
              >
                  Register
                  {activeTab === "register" && (
                      <motion.div layoutId="tab-bg" className="absolute inset-0 bg-white rounded-full shadow-sm -z-10" />
                  )}
              </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 text-red-500 p-3 text-[10px] font-bold text-center border border-red-100 rounded-lg uppercase tracking-widest">
              {error}
            </div>
          )}

          {/* Content Swapper */}
          <div className="relative min-h-80">
            <AnimatePresence mode="wait">
              {activeTab === "register" ? (
                <motion.div
                  key="register"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
                </motion.div>
              ) : (
                <motion.div
                  key="login"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.3 }}
                >
                  <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    )}
  </AnimatePresence>
  );
}