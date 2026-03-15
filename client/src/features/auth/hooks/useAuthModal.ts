import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "../services/authApi";
import type { LoginFormData, RegisterFormData } from "../types";

export function useAuthModal(onClose: () => void) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await loginUser(data);
      localStorage.setItem("token", result.token);
      onClose();
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await registerUser(data);
      localStorage.setItem("token", result.token);
      onClose();
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed.");
    } finally {
      setIsLoading(false);
    }
  };

  return { activeTab, setActiveTab, error, isLoading, handleLogin, handleRegister };
}