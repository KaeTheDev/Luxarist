export default function DangerZone() {
    return (
        <section className="border border-red-50 rounded-[2.5rem] p-8 bg-red-50/10">
            <h3 className="text-sm font-bold text-red-900 mb-2">Danger Zone</h3>
            <p className="text-xs text-red-600/60 mb-6">Permanently delete your account and all associated data.</p>
            <button type="button" className="px-6 py-3 border border-red-200 text-red-600 rounded-2xl text-[10px] uppercase tracking-widest font-black hover:bg-red-50 transition-all">
                Delete Account
            </button>
        </section>
    );
}