import type { DashboardTab } from "../../../shared/types";

export default function CustomerHeader({ activeTab }: { activeTab: DashboardTab }) {
    const getPageTitle = (tab: DashboardTab) => {
        switch(tab) {
            case "overview": return "Dashboard Overview";
            case "orders": return "Purchase History";
            case "reviews": return "Feedback Gallery";
            case "settings": return "Account Settings";
            default: return "Personal Space";
        }
    };

    return (
      <header className="hidden lg:block sticky top-0 z-30 w-full bg-white/70 backdrop-blur-md border-b border-stone-100 px-8 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex flex-col">
            <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold mb-1">
              Account
            </p>
            <h2 className="text-xl font-serif text-stone-900 tracking-tight italic">
              {getPageTitle(activeTab)}
            </h2>
          </div>

          <div className="text-right hidden sm:block">
              <div className="flex items-center justify-end gap-2 mb-1">
                  <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-stone-200 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-stone-400"></span>
                  </span>
                  <p className="text-[8px] uppercase tracking-[0.2em] text-stone-400 font-black">
                      Secure Session
                  </p>
              </div>
              <p className="text-[10px] font-serif italic text-stone-300">
                  Luxarist Member
              </p>
          </div>
        </div>
      </header>
    );
}