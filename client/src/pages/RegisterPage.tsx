import { RegisterForm } from "../features/auth/components/RegisterForm";
import { useAuthModal } from "../features/auth/hooks/useAuthModal";
import { Link } from "react-router-dom";

export default function RegisterPage() {
      // Logic is shared via the hook. No modal to close, so we pass () => {}
      const { error, isLoading, handleRegister } = useAuthModal(() => {});

      return(
        <div className="min-h-[80vh] flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full">
        <div className="mb-12 text-center">
          <h2 className="text-2xl font-light tracking-[0.3em] uppercase text-gray-900">
            LUXARIST
          </h2>
          <p className="mt-4 text-[10px] text-gray-400 uppercase tracking-widest leading-relaxed">
            Create an account to track orders <br/> and save favorites
          </p>
        </div>

        {error && (
          <div className="mb-6 bg-red-50 text-red-500 p-3 text-[10px] font-bold text-center border border-red-100 rounded-lg uppercase tracking-widest">
            {error}
          </div>
        )}

        <RegisterForm onSubmit={handleRegister} isLoading={isLoading} />
        
        <p className="mt-8 text-center text-[10px] text-gray-400 uppercase tracking-widest">
          Already a member? <br/>
          <Link 
            to="/login"
            className="text-black font-bold hover:underline mt-2 inline-block tracking-widest"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
      );
}