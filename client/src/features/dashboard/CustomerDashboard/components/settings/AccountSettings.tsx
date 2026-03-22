import { useAccountSettings } from "../../hooks/useAccountSettings";
import ProfileSection from "./ProfileSection";
import PasswordSection from "./PasswordSection";
import AddressSection from "./AddressSection";
import PaymentSection from "./PaymentSection";
import DangerZone from "./DangerZone";

export default function AccountSettings() {
    const { profileForm, setProfileForm, passwordForm, setPasswordForm, addresses, profileStatus, passwordStatus, addressStatus, profileLoading, passwordLoading, addressLoading, updateProfile, updatePassword, addAddress, deleteAddress } = useAccountSettings();

    return (
        <div className="max-w-4xl space-y-10 animate-in fade-in duration-700 pb-20">
            <header>
                <h2 className="text-3xl font-serif text-stone-900 tracking-tight">Account Settings</h2>
                <p className="text-sm text-stone-500 italic mt-1">Manage your account information and security.</p>
            </header>
            <div className="grid gap-8">
                <ProfileSection profileForm={profileForm} setProfileForm={setProfileForm} profileStatus={profileStatus} profileLoading={profileLoading} updateProfile={updateProfile} />
                <PasswordSection passwordForm={passwordForm} setPasswordForm={setPasswordForm} passwordStatus={passwordStatus} passwordLoading={passwordLoading} updatePassword={updatePassword} />
                <AddressSection addresses={addresses} addressStatus={addressStatus} addressLoading={addressLoading} addAddress={addAddress} deleteAddress={deleteAddress} />
                <PaymentSection />
                <DangerZone />
            </div>
        </div>
    );
}