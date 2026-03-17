import { RegisterForm } from "./RegisterForm";
import { LoginForm } from "./LoginForm";
import { AnimatePresence, motion } from "framer-motion";
import { useAuthModal } from "../hooks/useAuthModal";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { activeTab, setActiveTab, error, isLoading, handleLogin, handleRegister } = useAuthModal(onClose);

  // 1. Early return saves a deep level of indentation and 6+ lines of wrapping logic
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div 
        className="fixed inset-0 z-100 flex items-center justify-center p-6 bg-black/40 backdrop-blur-sm"
        onClick={(e) => e.target === e.currentTarget && onClose()} // 2. Inlined backdrop logic
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-112.5 w-full bg-white rounded-4xl shadow-2xl p-10 relative overflow-hidden"
        >
          {/* Close Button */}
          <button onClick={onClose} className="absolute right-8 top-8 text-gray-300 hover:text-gray-600 z-20">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          <div className="mb-8 text-center uppercase tracking-[0.2em] font-light text-2xl text-gray-900">LUXARIST</div>

          {/* 3. Mapping tabs */}
          <div className="bg-[#f3f3f3] p-1 rounded-full flex mb-10 relative">
            {(["login", "register"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative z-10 flex-1 py-2.5 text-sm font-medium transition-colors duration-300 capitalize ${activeTab === tab ? "text-black" : "text-gray-400"}`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tab-bg" className="absolute inset-0 bg-white rounded-full shadow-sm -z-10" transition={{ type: "spring", bounce: 0.2, duration: 0.6 }} />
                )}
              </button>
            ))}
          </div>

            {/* Error Display */}
          {error && (
            <div className="mb-6 bg-red-50 text-red-500 p-3 text-[10px] font-bold text-center border border-red-100 rounded-lg uppercase tracking-widest">
              {error}
            </div>
          )}

            {/* Form Content */}
          <div className="relative min-h-80">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -10 }} transition={{ duration: 0.3 }}
              >
                {activeTab === "register" 
                  ? <RegisterForm onSubmit={handleRegister} isLoading={isLoading} /> 
                  : <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
                }
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}