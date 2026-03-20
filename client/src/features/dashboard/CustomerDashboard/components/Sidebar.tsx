import { LayoutDashboard, ShoppingBag, MessageSquare, Settings, LogOut } from "lucide-react";
import NavItem from "./NavItem";
import type { DashboardTab, User } from "../../shared/types";

interface SidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  user: User | null;
}

export default function Sidebar({ activeTab, setActiveTab, user }: SidebarProps) {
  const displayName = user?.firstName || "Client";
  return (
    <aside className="w-72 bg-white bordr-r border-stone-100 h-screen sticky top-0 hidden lg:flex flex-col p-8 transition-all">
      {/* Luxarist Branding */}
      <div className="mb-12 px-4">
        <span className="text-[9px] uppercase tracking-[0.4em] text-stone-300 font-bold block mb-1">
          Client Portal
        </span>
        <h2 className="text-xs font-medium text-stone-500 italic">
        {displayName}'s Collection
        </h2>
      </div>

      {/* Primary Navigation */}
      <nav className="flex-1 space-y-2">
        <NavItem
          icon={<LayoutDashboard size={18} />}
          label="Overview"
          isActive={activeTab === "overview"}
          onClick={() => setActiveTab("overview")}
        />

        <NavItem
          icon={<ShoppingBag size={18} />}
          label="My Orders"
          isActive={activeTab === "orders"}
          onClick={() => setActiveTab("orders")}
        />

        <NavItem
          icon={<MessageSquare size={18} />}
          label="My Reviews"
          isActive={activeTab === "reviews"}
          onClick={() => setActiveTab("reviews")}
        />

        <NavItem
          icon={<Settings size={18} />}
          label="Settings"
          isActive={activeTab === "settings"}
          onClick={() => setActiveTab("settings")}
        />
      </nav>

      {/* Secondary Actions (Logout) */}
      <div className="pt-8 border-t border-stone-50">
        <button
          onClick={() => console.log("Logging out...")}
          className="w-full flex items-center gap-4 px-4 py-4 text-stone-400 hover:text-red-500 transition-colors group"
        >
          <LogOut
            size={18}
            className="group-hover:translate-x-1 transition-transform"
          />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
}
