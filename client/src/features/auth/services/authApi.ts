import type { RegisterFormData } from "../types";
import type { LoginFormData } from "../types";

const BASE_URL = import.meta.env.DEV ? "http://localhost:3000" : import.meta.env.VITE_API_URL;

const API_URL = `${BASE_URL.replace(/\/$/, "")}/api`;

export async function registerUser(data: RegisterFormData) {
    const response = await fetch(`${API_URL}auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if(!response.ok) {
        // This throws the "Email already exists" or other backend errors
        throw new Error(result.message || "Registration failed");
    }

    return result;
}

export async function loginUser(data: LoginFormData) {
    const response = await fetch(`${API_URL}auth/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    const result = await response.json();

    if(!response.ok) {
         // This throws backend errors
         throw new Error(result.message || "Login failed");
    }

    return result;
}
