import { LoginForm } from "../features/auth/components/LoginForm";
import { useAuthModal } from "../features/auth/hooks/useAuthModal";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const navigate = useNavigate();

  // Pass an empty function since there's no modal to close here
  const { error, isLoading, handleLogin } = useAuthModal(() => {});

  const handleGoToRegister = () => {
    // Redirect to home and we can pass state to tell App.tsx to open the modal
    navigate("/", { state: { openRegister: true } });
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-6">
    <div className="max-w-md w-full">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-light tracking-[0.3em] uppercase text-gray-900">
          LUXARIST
        </h2>
        <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest">
          Sign in to your account
        </p>
      </div>

      {error && (
        <div className="mb-6 bg-red-50 text-red-500 p-3 text-[10px] font-bold text-center border border-red-100 rounded-lg uppercase tracking-widest">
          {error}
        </div>
      )}

      <LoginForm onSubmit={handleLogin} isLoading={isLoading} />
      
      <p className="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest">
        Don't have an account? <br/>
        <button 
          onClick={handleGoToRegister}
          className="text-black font-bold cursor-pointer hover:underline mt-2 inline-block tracking-widest"
        >
          Register Now
        </button>
      </p>
    </div>
  </div>
  );
}