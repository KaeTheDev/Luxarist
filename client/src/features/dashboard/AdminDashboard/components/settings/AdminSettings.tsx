import { useAccountSettings } from "../../../CustomerDashboard/hooks/useAccountSettings";
import ProfileSection from "../../../shared/components/ProfileSection";
import PasswordSection from "../../../shared/components/PasswordSection";
import DangerZone from "../../../shared/components/DangerZone";

export default function AdminSettings() {
    // We only pull what the Admin actually uses
    const { 
        profileForm, setProfileForm, 
        passwordForm, setPasswordForm, 
        profileStatus, passwordStatus, 
        profileLoading, passwordLoading, 
        updateProfile, updatePassword 
    } = useAccountSettings();

    return (
        <div className="max-w-4xl space-y-10 animate-in fade-in duration-700 pb-20">
            <header className="flex justify-between items-end border-b border-stone-100 pb-6">
                <div>
                    <h2 className="text-3xl font-serif text-stone-900 tracking-tight italic">Registry Settings</h2>
                    <p className="text-sm text-stone-500 font-light mt-1">Refining your administrative access and system preferences.</p>
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-black text-stone-300 bg-stone-50 px-4 py-2 rounded-full border border-stone-100">
                    Access Level: Super Admin
                </div>
            </header>

            <div className="grid gap-12">
                {/* 1. Admin Profile: Name and "Admin Boss" Email */}
                <ProfileSection 
                    profileForm={profileForm} 
                    setProfileForm={setProfileForm} 
                    profileStatus={profileStatus} 
                    profileLoading={profileLoading} 
                    updateProfile={updateProfile} 
                />

                {/* 2. Security: Keeping your access locked down */}
                <PasswordSection 
                    passwordForm={passwordForm} 
                    setPasswordForm={setPasswordForm} 
                    passwordStatus={passwordStatus} 
                    passwordLoading={passwordLoading} 
                    updatePassword={updatePassword} 
                />

                {/* 3. Danger Zone: For account deactivation */}
                <DangerZone />
            </div>
        </div>
    );
}