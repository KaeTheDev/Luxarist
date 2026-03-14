import type { RegisterFormData } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

export async function registerUser(data: RegisterFormData) {
    const response = await fetch(`${API_URL}/auth/register`, {
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