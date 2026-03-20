import type { DashboardTab } from "../../shared/types";

interface HeaderProps {
    activeTab: DashboardTab;
}

export default function Header({ activeTab }: HeaderProps) {
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
      <header className="hidden lg:block sticky top-0 z-30 w-full bg-white/70 backdrop-blur-md border-b border-stone-100 px-6 py-4">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <h2 className="text-sm font-serif text-stone-900 tracking-tight md:text-base">
          {getPageTitle(activeTab)}
        </h2>
      </div>
    </header>
  );
}