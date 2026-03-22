import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";

const API_URL = import.meta.env.DEV ? "http://localhost:3000/api" : import.meta.env.VITE_API_URL;

export interface Address {
    _id: string;
    type: string;
    address: string;
    isDefault: boolean;
}

interface ProfileForm {
    firstName: string;
    lastName: string;
    email: string;
}

interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface Status {
    type: "success" | "error" | null;
    message: string;
}

export function useAccountSettings() {
    const { user, token, login: updateAuth } = useAuth();

    const [profileForm, setProfileForm] = useState<ProfileForm>({
        firstName: user?.firstName ?? "",
        lastName: user?.lastName ?? "",
        email: user?.email ?? "",
    });

    const [passwordForm, setPasswordForm] = useState<PasswordForm>({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });

    const [addresses, setAddresses] = useState<Address[]>([]);
    const [profileStatus, setProfileStatus] = useState<Status>({ type: null, message: ""});
    const [passwordStatus, setPasswordStatus] = useState<Status>({ type: null, message: "" });
    const [addressStatus, setAddressStatus] = useState<Status>({ type: null, message: ""});
    const [profileLoading, setProfileLoading] = useState(false);
    const [passwordLoading, setPasswordLoading] = useState(false);
    const [addressLoading, setAddressLoading] = useState(false);

    // Fetch full profile
    useEffect(() => {
        if(!token) return;
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_URL}/auth/me`, {
                    headers: { Authorization: `Bearer ${token}`},
                });
                if(!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();
                setAddresses(data.addresses ?? []);
            } catch(err: any) {
                console.error(err.message);
            }
        };
        fetchProfile();
    }, [token]);

    const updateProfile = async () => {
        setProfileLoading(true);
        setProfileStatus({ type: null, message: "" });
        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    firstName: profileForm.firstName,
                    lastName: profileForm.lastName,
                }),
            });
            if (!res.ok) throw new Error("Failed to update profile");
            const data = await res.json();
            // Update AuthContext so sidebar name updates immediately
            updateAuth(token!, {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role,
            });
            setProfileStatus({ type: "success", message: "Profile updated successfully." });
        } catch (err: any) {
            setProfileStatus({ type: "error", message: err.message });
        } finally {
            setProfileLoading(false);
        }
    };

    const updatePassword = async () => {
        setPasswordLoading(true);
        setPasswordStatus({ type: null, message: "" });

        if (passwordForm.newPassword !== passwordForm.confirmPassword) {
            setPasswordStatus({ type: "error", message: "Passwords do not match." });
            setPasswordLoading(false);
            return;
        }

        try {
            const res = await fetch(`${API_URL}/auth/password`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    currentPassword: passwordForm.currentPassword,
                    newPassword: passwordForm.newPassword,
                }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message);
            }
            setPasswordStatus({ type: "success", message: "Password updated successfully." });
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err: any) {
            setPasswordStatus({ type: "error", message: err.message });
        } finally {
            setPasswordLoading(false);
        }
    };

    const addAddress = async (type: string, address: string, isDefault: boolean) => {
        setAddressLoading(true);
        setAddressStatus({ type: null, message: "" });
        try {
            const res = await fetch(`${API_URL}/auth/me/addresses`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ type, address, isDefault }),
            });
            if (!res.ok) throw new Error("Failed to add address");
            const data = await res.json();
            setAddresses(data);
            setAddressStatus({ type: "success", message: "Address added." });
        } catch (err: any) {
            setAddressStatus({ type: "error", message: err.message });
        } finally {
            setAddressLoading(false);
        }
    };

    const deleteAddress = async (addressId: string) => {
        setAddressLoading(true);
        setAddressStatus({ type: null, message: "" });
        try {
            const res = await fetch(`${API_URL}/auth/me/addresses/${addressId}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Failed to delete address");
            const data = await res.json();
            setAddresses(data);
        } catch (err: any) {
            setAddressStatus({ type: "error", message: err.message });
        } finally {
            setAddressLoading(false);
        }
    };

    return { profileForm, setProfileForm, passwordForm, setPasswordForm, addresses, profileStatus, passwordStatus, addressStatus, profileLoading, passwordLoading, addressLoading, updateProfile, updatePassword, addAddress, deleteAddress };
}