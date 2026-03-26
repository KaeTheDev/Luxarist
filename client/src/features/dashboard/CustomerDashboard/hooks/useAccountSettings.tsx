import { useState, useEffect } from "react";
import { useAuth } from "../../../../context/AuthContext";
import { API_URL, getAuthHeaders } from "../../../../api/config";

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
    const headers = getAuthHeaders(token);

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

    // 1. Fetch full profile (Addresses and Member Data)
    useEffect(() => {
        if(!token) return;
        const fetchProfile = async () => {
            try {
                const res = await fetch(`${API_URL}/auth/me`, { headers });
                if(!res.ok) throw new Error("Failed to fetch profile");
                const data = await res.json();
                setAddresses(data.addresses ?? []);
            } catch(err: any) {
                console.error("Profile Fetch Error:", err.message);
            }
        };
        fetchProfile();
    }, [token]);

    // 2. Update Basic Profile (First/Last Name)
    const updateProfile = async () => {
        setProfileLoading(true);
        setProfileStatus({ type: null, message: "" });
        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                method: "PUT",
                headers,
                body: JSON.stringify({
                    firstName: profileForm.firstName,
                    lastName: profileForm.lastName,
                }),
            });
            if (!res.ok) throw new Error("Failed to update profile");
            const data = await res.json();
            
            // Sync the AuthContext so the UI updates globally
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

    // 3. Update Password
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
                headers,
                body: JSON.stringify({
                    currentPassword: passwordForm.currentPassword,
                    newPassword: passwordForm.newPassword,
                }),
            });
            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || "Password update failed");
            }
            setPasswordStatus({ type: "success", message: "Password updated successfully." });
            setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
        } catch (err: any) {
            setPasswordStatus({ type: "error", message: err.message });
        } finally {
            setPasswordLoading(false);
        }
    };

    // 4. Add Shipping Address
    const addAddress = async (type: string, address: string, isDefault: boolean) => {
        setAddressLoading(true);
        setAddressStatus({ type: null, message: "" });
        try {
            const res = await fetch(`${API_URL}/auth/me/addresses`, {
                method: "POST",
                headers,
                body: JSON.stringify({ type, address, isDefault }),
            });
            if (!res.ok) throw new Error("Failed to add address");
            const data = await res.json();
            setAddresses(data); // Backend returns the updated addresses array
            setAddressStatus({ type: "success", message: "Address added." });
        } catch (err: any) {
            setAddressStatus({ type: "error", message: err.message });
        } finally {
            setAddressLoading(false);
        }
    };

    // 5. Delete Shipping Address
    const deleteAddress = async (addressId: string) => {
        setAddressLoading(true);
        setAddressStatus({ type: null, message: "" });
        try {
            const res = await fetch(`${API_URL}/auth/me/addresses/${addressId}`, {
                method: "DELETE",
                headers,
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

    return { 
        profileForm, setProfileForm, 
        passwordForm, setPasswordForm, 
        addresses, 
        profileStatus, passwordStatus, addressStatus, 
        profileLoading, passwordLoading, addressLoading, 
        updateProfile, updatePassword, addAddress, deleteAddress 
    };
}