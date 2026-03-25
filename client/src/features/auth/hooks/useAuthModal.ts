import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { loginUser, registerUser } from "../services/authApi";
import type { LoginFormData, RegisterFormData } from "../types";
import { useAuth } from "../../../context/AuthContext";

export function useAuthModal(onClose: () => void) {
  const location = useLocation();
  const navigate = useNavigate();
  const { login } = useAuth();

  const shouldRegister = location.state?.openRegister === true;
  const [activeTab, setActiveTab] = useState<"login" | "register">(
    shouldRegister ? "register" : "login"
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (shouldRegister) {
      setActiveTab("register");
    } else {
      setActiveTab("login");
    }
  }, [shouldRegister]);
  

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await loginUser(data);
      login(result.token, result.user);
      onClose();

      // Route based on role
      const destination = result.user.role === "admin" ? "/admin" : location.state?.from?.pathname || "/dashboard";

      navigate(destination, { replace: true });
    } catch (err: any) {
      setError(err.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await registerUser(data);
      login(result.token, result.user);
      onClose();
      navigate("/dashboard", { replace: true });
    } catch (err: any) {
      setError(err.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return { activeTab, setActiveTab, error, isLoading, handleLogin, handleRegister };
}