import { User, Save, Loader2 } from "lucide-react";

interface ProfileForm {
    firstName: string;
    lastName: string;
    email: string;
}

interface Status {
    type: "success" | "error" | null;
    message: string;
}

interface Props {
    profileForm: ProfileForm;
    setProfileForm: (form: ProfileForm) => void;
    profileStatus: Status;
    profileLoading: boolean;
    updateProfile: () => void;
}

export default function ProfileSection({ profileForm, setProfileForm, profileStatus, profileLoading, updateProfile }: Props) {
    return (
        <section className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-stone-50">
                <User size={18} className="text-stone-400" />
                <h3 className="text-sm font-semibold text-stone-900">Profile Information</h3>
            </div>
            <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">First Name</label>
                        <input type="text" value={profileForm.firstName}
                            onChange={(e) => setProfileForm({ ...profileForm, firstName: e.target.value })}
                            className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-stone-900 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Last Name</label>
                        <input type="text" value={profileForm.lastName}
                            onChange={(e) => setProfileForm({ ...profileForm, lastName: e.target.value })}
                            className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-stone-900 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Email Address</label>
                        <input type="email" value={profileForm.email} disabled
                            className="w-full bg-stone-50/30 border border-stone-50 rounded-2xl px-5 py-3 text-sm text-stone-400 cursor-not-allowed italic"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <div className="text-sm font-medium">
                        {profileStatus.type === "success" && <span className="text-green-600">{profileStatus.message}</span>}
                        {profileStatus.type === "error" && <span className="text-red-500">{profileStatus.message}</span>}
                    </div>
                    <button onClick={updateProfile} disabled={profileLoading}
                        className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-[10px] uppercase tracking-widest font-bold rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-50"
                    >
                        {profileLoading ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                        {profileLoading ? "Saving..." : "Save Profile"}
                    </button>
                </div>
            </div>
        </section>
    );
}