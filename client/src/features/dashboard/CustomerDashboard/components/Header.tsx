import { Menu, UserCircle } from "lucide-react";
import type { DashboardTab } from "../../shared/types";

interface HeaderProps {
    activeTab: DashboardTab;
    onMenuClick: () => void;
    userName?: string;
}

export default function Header({ activeTab, onMenuClick, userName = "Shakira" }: HeaderProps) {
    // Dynamic Page Title Logic
    const getPageTitle = (tab: DashboardTab) => {
        switch(tab) {
            case "overview": return "Dashboard Overview";
            case "orders": return "My Purchase History";
            case "reviews": return "My Feedback Gallery";
            case "settings": return "Account Settings";
            default: return "Luxarist";
        }
    };

    return (
        <header className="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-md border-b border-stone-100 px-6 py-4 transition-all duration-300">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        
        {/* 2. Mobile Menu Trigger & Title */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onMenuClick}
            className="lg:hidden p-2 -ml-2 text-stone-600 hover:bg-stone-50 rounded-xl transition-colors"
            aria-label="Open navigation"
          >
            <Menu size={20} />
          </button>
          
          <h2 className="text-sm font-serif text-stone-900 tracking-tight md:text-base animate-in fade-in slide-in-from-left-2 duration-500">
            {getPageTitle(activeTab)}
          </h2>
        </div>

        {/* 3. User Identity */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right">
            <p className="text-[10px] uppercase tracking-[0.2em] text-stone-300 font-bold">Welcome back,</p>
            <p className="text-xs font-semibold text-stone-900 tracking-tight">{userName}</p>
          </div>
          <div className="w-9 h-9 rounded-full bg-stone-50 border border-stone-100 flex items-center justify-center text-stone-400">
            <UserCircle size={22} strokeWidth={1.5} />
          </div>
        </div>

      </div>
    </header>
  );
}