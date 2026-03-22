import { Lock, Save, Loader2 } from "lucide-react";

interface PasswordForm {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

interface Status {
    type: "success" | "error" | null;
    message: string;
}

interface Props {
    passwordForm: PasswordForm;
    setPasswordForm: (form: PasswordForm) => void;
    passwordStatus: Status;
    passwordLoading: boolean;
    updatePassword: () => void;
}

export default function PasswordSection({ passwordForm, setPasswordForm, passwordStatus, passwordLoading, updatePassword }: Props) {
    return (
        <section className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8 pb-4 border-b border-stone-50">
                <Lock size={18} className="text-stone-400" />
                <h3 className="text-sm font-semibold text-stone-900">Password</h3>
            </div>
            <div className="space-y-4">
                <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Current Password</label>
                    <input type="password" value={passwordForm.currentPassword}
                        onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                        className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-stone-900 transition-all"
                    />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">New Password</label>
                        <input type="password" value={passwordForm.newPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                            className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-stone-900 transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Confirm Password</label>
                        <input type="password" value={passwordForm.confirmPassword}
                            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                            className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-stone-900 transition-all"
                        />
                    </div>
                </div>
                <div className="flex items-center justify-between pt-2">
                    <div className="text-sm font-medium">
                        {passwordStatus.type === "success" && <span className="text-green-600">{passwordStatus.message}</span>}
                        {passwordStatus.type === "error" && <span className="text-red-500">{passwordStatus.message}</span>}
                    </div>
                    <button onClick={updatePassword} disabled={passwordLoading}
                        className="flex items-center gap-2 px-6 py-3 bg-stone-900 text-white text-[10px] uppercase tracking-widest font-bold rounded-xl hover:bg-stone-700 transition-colors disabled:opacity-50"
                    >
                        {passwordLoading ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
                        {passwordLoading ? "Saving..." : "Update Password"}
                    </button>
                </div>
            </div>
        </section>
    );
}