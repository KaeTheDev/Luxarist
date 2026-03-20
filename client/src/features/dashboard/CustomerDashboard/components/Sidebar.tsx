// import { LayoutDashboard, ShoppingBag, MessageSquare, Settings, LogOut } from "lucide-react";
// import NavItem from "./NavItem";
// import type { DashboardTab, User } from "../../shared/types";
// import { useAuth } from "../../../../context/AuthContext";

// interface SidebarProps {
//   activeTab: DashboardTab;
//   setActiveTab: (tab: DashboardTab) => void;
//   user: User | null;
// }

// export default function Sidebar({ activeTab, setActiveTab, user }: SidebarProps) {
//   const { logout } = useAuth();
//   return (
//     <aside className="hidden md:flex flex-col w-64 border-r border-stone-100 bg-white h-[calc(100vh-80px)] sticky top-20">
//       {/* Luxarist Branding */}
//       <div className="p-8">
//         <p className="text-[10px] uppercase tracking-[0.2em] text-stone-400 mt-1">Client Dashboard</p>
//       </div>

//       {/* Primary Navigation */}
//       <nav className="flex-1 space-y-2">
//         <NavItem
//           icon={<LayoutDashboard size={18} />}
//           label="Overview"
//           isActive={activeTab === "overview"}
//           onClick={() => setActiveTab("overview")}
//         />

//         <NavItem
//           icon={<ShoppingBag size={18} />}
//           label="My Orders"
//           isActive={activeTab === "orders"}
//           onClick={() => setActiveTab("orders")}
//         />

//         <NavItem
//           icon={<MessageSquare size={18} />}
//           label="My Reviews"
//           isActive={activeTab === "reviews"}
//           onClick={() => setActiveTab("reviews")}
//         />

//         <NavItem
//           icon={<Settings size={18} />}
//           label="Settings"
//           isActive={activeTab === "settings"}
//           onClick={() => setActiveTab("settings")}
//         />
//       </nav>

//       {/* Secondary Actions (Logout) */}
//       <div className="pt-8 border-t border-stone-50">
//         <button
//           onClick={() => console.log("Logging out...")}
//           className="w-full flex items-center gap-4 px-4 py-4 text-stone-400 hover:text-red-500 transition-colors group"
//         >
//           <LogOut
//             size={18}
//             className="group-hover:translate-x-1 transition-transform"
//           />
//           <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
//             Sign Out
//           </span>
//         </button>
//       </div>
//     </aside>
//   );
// }

import { 
  LayoutDashboard, 
  ShoppingBag, 
  MessageSquare, 
  Settings, 
  LogOut,
  UserCircle 
} from "lucide-react";
import type { DashboardTab, User } from "../../shared/types";
import { useAuth } from "../../../../context/AuthContext";


interface SidebarProps {
  activeTab: DashboardTab;
  setActiveTab: (tab: DashboardTab) => void;
  user: User | null;
}

export default function Sidebar({ activeTab, setActiveTab, user }: SidebarProps) {
  const { logout } = useAuth();

  const navItems: { id: DashboardTab; label: string; icon: any }[] = [
    { id: "overview", label: "Overview", icon: LayoutDashboard },
    { id: "orders", label: "My Orders", icon: ShoppingBag },
    { id: "reviews", label: "My Reviews", icon: MessageSquare },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 border-r border-stone-100 bg-white h-[calc(100vh-80px)] sticky top-20">
      
    
      <div className="p-8 mb-4">
        <div className="flex items-center gap-4 p-4 rounded-2xl bg-stone-50 border border-stone-100">
          <div className="w-12 h-12 rounded-full bg-white border border-stone-200 flex items-center justify-center text-stone-400 shadow-sm">
            <UserCircle size={28} strokeWidth={1} />
          </div>
          <div className="flex flex-col overflow-hidden">
            <p className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-bold mb-0.5">Welcome back,</p>
            <p className="text-sm font-serif text-stone-900 truncate tracking-tight italic">
              {user?.firstName || "Shakira"}
            </p>
          </div>
        </div>
      </div>

      {/* 2. Navigation Section */}
      <nav className="flex-1 px-6">
        <ul className="space-y-3">
          {navItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all duration-300 group ${
                  activeTab === item.id 
                    ? "bg-stone-900 text-white shadow-xl shadow-stone-200" 
                    : "text-stone-500 hover:bg-stone-50 hover:text-stone-900"
                }`}
              >
                <item.icon size={18} strokeWidth={activeTab === item.id ? 2 : 1.5} />
                <span className="text-[10px] uppercase tracking-[0.15em] font-black">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* 3. Footer Action */}
      <div className="p-8 mt-auto border-t border-stone-50">
        <button 
          onClick={logout}
          className="flex items-center gap-3 text-stone-400 hover:text-red-500 transition-colors group w-full px-2"
        >
          <LogOut size={18} strokeWidth={1.5} />
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Sign Out</span>
        </button>
      </div>
    </aside>
  );
}