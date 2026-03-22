import type React from "react";

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

export default function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
    return (
        <button
          onClick={onClick}
          className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group ${
            isActive 
              ? "bg-stone-900 text-white shadow-lg shadow-stone-900/10" 
              : "text-stone-400 hover:bg-stone-50 hover:text-stone-600"
          }`}
        >
          <div className={`${isActive ? "text-white" : "text-stone-300 group-hover:text-stone-900"} transition-colors`}>
            {icon}
          </div>
          <span className="text-[10px] uppercase tracking-[0.2em] font-bold">
            {label}
          </span>
        </button>
      );
}