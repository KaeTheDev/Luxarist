import { useState } from "react";
import { User, Lock,  Mail, Save, Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function AccountSettings() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{type: 'success' | 'error' | null; message: string }>({
        type: null, message: ""
    });

    // Setup Form State
    const [formData, setFormData] = useState({
        firstName: "Shakira", // in production, this comes from the Auth context/API
        lastName: "Reid-Thomas",
        email: "shakira@luxarist",
        newPassword: "",
        confirmPassword: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.SubmitEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: "" });

        // Validate Passwords Match
        if(formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setStatus({ type: 'error', message: "Passwords do not match." });
            setLoading(false);
            return;
        }

        // Implement simulated PATCH /api/users/me
        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API delay

            console.log("PATCH /api/users/me", {
                firstName: formData.firstName,
                lastName: formData.lastName,
                password: formData.newPassword || undefined
            });

            setStatus({ type: 'success', message: "Profile updated successfully." });
            setFormData(prev => ({ ...prev, newPassword: "", confirmPassword: "" }));
        } catch (err) {
            setStatus({ type: 'error', message: "Failed to update profile. Please try again." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl space-y-8 animate-in fade-in duration-700">
          <header>
            <h2 className="text-2xl font-serif text-stone-900">Account Settings</h2>
            <p className="text-sm text-stone-500 italic">Refine your profile and security credentials.</p>
          </header>
    
          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Section: Personal Details */}
            <div className="bg-white border border-stone-100 p-8 rounded-4xl shadow-sm space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-stone-50">
                <User size={16} className="text-stone-400" />
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-900">Identity</h3>
              </div>
    
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">First Name</label>
                  <input 
                    name="firstName"
                    type="text" 
                    value={formData.firstName}
                    onChange={handleChange}
                    className="w-full bg-stone-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-stone-900 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Last Name</label>
                  <input 
                    name="lastName"
                    type="text" 
                    value={formData.lastName}
                    onChange={handleChange}
                    className="w-full bg-stone-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-stone-900 transition-all"
                  />
                </div>
              </div>
    
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1 flex items-center gap-2">
                  Email Address <span className="normal-case font-medium italic text-stone-300">(Read-only)</span>
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-300" size={16} />
                  <input 
                    type="email" 
                    value={formData.email}
                    disabled 
                    className="w-full bg-stone-100 border-none rounded-2xl pl-12 pr-5 py-3 text-sm text-stone-400 cursor-not-allowed font-light"
                  />
                </div>
              </div>
            </div>
    
            {/* Section: Security */}
            <div className="bg-white border border-stone-100 p-8 rounded-4xl shadow-sm space-y-6">
              <div className="flex items-center gap-2 pb-4 border-b border-stone-50">
                <Lock size={16} className="text-stone-400" />
                <h3 className="text-[10px] uppercase tracking-[0.2em] font-bold text-stone-900">Security</h3>
              </div>
    
              <div className="grid md:grid-cols-2 gap-6">
                <input 
                  name="newPassword"
                  type="password" 
                  placeholder="New Password"
                  value={formData.newPassword}
                  onChange={handleChange}
                  className="w-full bg-stone-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-stone-900 transition-all placeholder:text-stone-300"
                />
                <input 
                  name="confirmPassword"
                  type="password" 
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-stone-50 border-none rounded-2xl px-5 py-3 text-sm focus:ring-2 focus:ring-stone-900 transition-all placeholder:text-stone-300"
                />
              </div>
            </div>
    
            {/* Footer: Feedback & Save */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
              <div className="min-h-6">
                {status.type === 'success' && (
                  <div className="flex items-center gap-2 text-green-600 animate-in fade-in slide-in-from-left-2">
                    <CheckCircle2 size={18} />
                    <span className="text-sm font-medium">{status.message}</span>
                  </div>
                )}
                {status.type === 'error' && (
                  <div className="flex items-center gap-2 text-red-500 animate-in shake duration-300">
                    <AlertCircle size={18} />
                    <span className="text-sm font-medium">{status.message}</span>
                  </div>
                )}
              </div>
              
              <button 
                type="submit"
                disabled={loading}
                className="w-full md:w-auto bg-stone-900 text-white px-10 py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-black flex items-center justify-center gap-3 hover:bg-stone-800 disabled:bg-stone-200 transition-all shadow-lg active:scale-95"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </div>
      );
    }