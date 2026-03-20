import { useState } from "react";
import { User, Lock, MapPin, CreditCard, Trash2, Plus, Save, Loader2 } from "lucide-react";

export default function AccountSettings() {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<{type: 'success' | 'error' | null; message: string }>({
        type: null, message: ""
    });

    const [formData, setFormData] = useState({
        firstName: "Shakira",
        lastName: "Reid-Thomas",
        email: "shakira@luxarist.com",
        newPassword: "",
        confirmPassword: ""
    });

    const addresses = [
        { id: 1, type: "Home", isDefault: true, address: "123 Luxury Avenue, New York, NY 10022" }
    ];

    const payments = [
        { id: 1, brand: "Visa", last4: "4532", isDefault: true, expiry: "12/26" }
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setStatus({ type: null, message: "" });

        if(formData.newPassword && formData.newPassword !== formData.confirmPassword) {
            setStatus({ type: 'error', message: "Passwords do not match." });
            setLoading(false);
            return;
        }

        try {
            await new Promise(resolve => setTimeout(resolve, 1500));
            setStatus({ type: 'success', message: "Profile updated successfully." });
        } catch (err) {
            setStatus({ type: 'error', message: "Update failed." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl space-y-10 animate-in fade-in duration-700 pb-20">
          <header>
            <h2 className="text-3xl font-serif text-stone-900 tracking-tight">Account Settings</h2>
            <p className="text-sm text-stone-500 italic mt-1">Manage your account information and security.</p>
          </header>
    
          <form onSubmit={handleSubmit} className="grid gap-8">
            
            {/* 1. Profile Information */}
            <section className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-50">
                <div className="flex items-center gap-3">
                    <User size={18} className="text-stone-400" />
                    <h3 className="text-sm font-semibold text-stone-900">Profile Information</h3>
                </div>
                <button type="button" className="text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 transition-colors">Edit</button>
              </div>
    
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Full Name</label>
                        <input name="firstName" type="text" value={`${formData.firstName} ${formData.lastName}`} onChange={handleChange} className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl px-5 py-3 text-sm focus:ring-1 focus:ring-stone-900 transition-all" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-[10px] uppercase tracking-widest text-stone-400 font-bold ml-1">Email Address</label>
                        <input type="email" value={formData.email} disabled className="w-full bg-stone-50/30 border border-stone-50 rounded-2xl px-5 py-3 text-sm text-stone-400 cursor-not-allowed italic" />
                    </div>
                </div>
              </div>
            </section>
    
             {/* 2. Password Section */}
            <section className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-50">
                <div className="flex items-center gap-3">
                    <Lock size={18} className="text-stone-400" />
                    <h3 className="text-sm font-semibold text-stone-900">Password</h3>
                </div>
                <button type="button" className="text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 transition-colors">Change</button>
              </div>
              <input type="password" placeholder="••••••••" disabled className="w-full bg-stone-50/50 border border-stone-100 rounded-2xl px-5 py-3 text-sm" />
            </section>

            {/* 3. Shipping Addresses */}
            <section className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-50">
                <div className="flex items-center gap-3">
                    <MapPin size={18} className="text-stone-400" />
                    <h3 className="text-sm font-semibold text-stone-900">Shipping Addresses</h3>
                </div>
                <button type="button" className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900 transition-colors">
                    <Plus size={12} /> Add New
                </button>
              </div>
              
              {addresses.map(addr => (
                <div key={addr.id} className="p-6 border border-stone-100 rounded-3xl flex justify-between items-start">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-medium text-stone-900">{addr.type}</span>
                            {addr.isDefault && <span className="bg-stone-900 text-white text-[8px] px-2 py-0.5 rounded-full uppercase tracking-tighter">Default</span>}
                        </div>
                        <p className="text-xs text-stone-500 max-w-50 leading-relaxed">{addr.address}</p>
                    </div>
                    <button type="button" className="text-stone-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                </div>
              ))}
            </section>

          {/* 4. Payment Methods */}
            <section className="bg-white border border-stone-100 rounded-[2.5rem] p-8 shadow-sm">
                <div className="flex justify-between items-center mb-8 pb-4 border-b border-stone-50">
                    <div className="flex items-center gap-3">
                        <CreditCard size={18} className="text-stone-400" />
                        <h3 className="text-sm font-semibold text-stone-900">Payment Methods</h3>
                    </div>
                    <button type="button" className="text-[10px] uppercase tracking-widest font-bold text-stone-400 hover:text-stone-900">Add New</button>
                </div>
                {payments.map(pay => (
                    <div key={pay.id} className="p-6 border border-stone-100 rounded-3xl flex justify-between items-center">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-6 bg-stone-50 rounded border border-stone-100 flex items-center justify-center text-[10px] font-bold italic text-stone-400">{pay.brand}</div>
                            <div>
                                <p className="text-sm font-medium text-stone-900">•••• •••• •••• {pay.last4}</p>
                                <p className="text-[10px] text-stone-400 uppercase tracking-widest">Expires {pay.expiry}</p>
                            </div>
                        </div>
                        <button type="button" className="text-stone-300 hover:text-red-500"><Trash2 size={16} /></button>
                    </div>
                ))}
            </section>

          {/* 5. Danger Zone */}
            <section className="border border-red-50 rounded-[2.5rem] p-8 bg-red-50/10">
                <h3 className="text-sm font-bold text-red-900 mb-2">Danger Zone</h3>
                <p className="text-xs text-red-600/60 mb-6">Permanently delete your account and all associated data.</p>
                <button type="button" className="px-6 py-3 border border-red-200 text-red-600 rounded-2xl text-[10px] uppercase tracking-widest font-black hover:bg-red-50 transition-all">
                    Delete Account
                </button>
            </section>
    
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-4">
              {/* Status Feedback */}
              <div className="text-sm font-medium">
                {status.type === 'success' && <span className="text-green-600">{status.message}</span>}
                {status.type === 'error' && <span className="text-red-500">{status.message}</span>}
              </div>

              <button 
                type="submit" 
                disabled={loading} 
                className="bg-stone-900 text-white px-10 py-4 rounded-2xl text-[10px] uppercase tracking-[0.3em] font-black flex items-center gap-3 hover:bg-stone-800 transition-all shadow-lg"
              >
                {loading ? <Loader2 className="animate-spin" size={16} /> : <Save size={16} />}
                {loading ? "Updating..." : "Save All Changes"}
              </button>
            </div>
          </form>
        </div>
      );
}