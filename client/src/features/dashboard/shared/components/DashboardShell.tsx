import type { ReactNode } from "react";
import { LayoutDashboard, ShoppingBag, Users, Settings, Package, LogOut, Heart, ChevronRight, ArrowLeft } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../../../context/AuthContext";

interface NavItem {
    label: string;
    href: string;
    icon: ReactNode;
}

interface DashboardShellProps {
    children: ReactNode;
    role: 'admin' | 'customer';
    title: string;
}

export default function DashboardShell({ children, role, title }: DashboardShellProps) {
    const location = useLocation();
    const { user, logout } = useAuth();

    // Define the Navigation Logic
    const adminLinks: NavItem[] = [
        { label: 'Overview', href: '/admin', icon: <LayoutDashboard size={18} /> },
        { label: 'Inventory', href: '/admin/products', icon: <Package size={18} /> },
        { label: 'Orders', href: '/admin/orders', icon: <ShoppingBag size={18} /> },
        { label: 'Customers', href: '/admin/users', icon: <Users size={18} /> },
    ];

    const customerLinks: NavItem[] = [
        { label: 'Collection', href: '/dashboard', icon: <Heart size={18} /> },
        { label: 'Orders', href: '/dashboard/orders', icon: <ShoppingBag size={18} /> },
        { label: 'Settings', href: '/dashboard/settings', icon: <Settings size={18} /> },
    ];

    const links = role === 'admin' ? adminLinks : customerLinks;

    return (
        <div className="flex h-screen bg-white text-stone-900 overflow-hidden font-sans">
            {/* --- SIDEBAR (Hidden on mobile for future responsiveness) --- */}
            <aside className="hidden lg:flex w-72 border-r border-stone-100 flex-col bg-white z-20">
                <div className="p-10">
                    <Link to="/" className="group">
                        <h1 className="text-2xl font-serif italic tracking-tighter group-hover:text-stone-500 transition-colors">Luxarist</h1>
                    </Link>
                    <p className="text-[9px] uppercase tracking-[0.4em] text-stone-400 mt-2 font-black">
                        {role === 'admin' ? 'Management' : 'Client Suite'}
                    </p>
                </div>

                <nav className="flex-1 px-6 space-y-2">
                    {links.map((link) => {
                        const isActive = location.pathname === link.href;
                        return (
                            <Link 
                                key={link.label}
                                to={link.href}
                                className={`flex items-center justify-between px-5 py-4 rounded-2xl transition-all duration-300 group ${
                                    isActive 
                                    ? 'bg-stone-50 text-stone-900 shadow-sm' 
                                    : 'text-stone-400 hover:text-stone-600 hover:bg-stone-50/50'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`${isActive ? 'scale-110' : 'group-hover:scale-110'} transition-transform`}>
                                        {link.icon}
                                    </span>
                                    <span className="text-[10px] uppercase tracking-[0.15em] font-bold">{link.label}</span>
                                </div>
                                {isActive && <ChevronRight size={14} className="text-stone-300" />}
                            </Link>
                        );
                    })}
                </nav>

                {/* --- SIDEBAR FOOTER (Sign Out) --- */}
                <div className="p-8 border-t border-stone-50">
                    <button 
                        onClick={logout}
                        className="flex items-center gap-4 px-5 py-4 w-full text-stone-400 hover:text-red-500 transition-colors group"
                    >
                        <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="text-[10px] uppercase tracking-widest font-bold">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* --- MAIN CONTENT AREA --- */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Top Header */}
                <header className="h-24 flex items-center justify-between px-16 bg-white/70 backdrop-blur-xl sticky top-0 z-10 border-b border-stone-50">
                    <div className="flex items-center gap-6">
                        <Link 
                            to="/" 
                            className="flex items-center gap-2 text-stone-400 hover:text-stone-900 transition-colors group"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-[10px] uppercase tracking-[0.2em] font-bold">Store</span>
                        </Link>
                        <span className="text-stone-100 font-light">|</span>
                        <h2 className="text-sm font-serif italic text-stone-400 uppercase tracking-tight">{title}</h2>
                    </div>
                    
                    <div className="flex items-center gap-6">
                        <div className="text-right hidden sm:block">
                            <p className="text-[10px] font-black uppercase tracking-widest text-stone-900">
                                {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-[8px] text-stone-400 uppercase tracking-[0.2em] mt-0.5">{role} access</p>
                        </div>
                        <div className="w-11 h-11 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-900 overflow-hidden shadow-inner">
                             <span className="text-xs font-serif italic uppercase">
                                {user?.firstName?.charAt(0) || 'L'}
                             </span>
                        </div>
                    </div>
                </header>

                {/* --- RENDERED CONTENT --- */}
                <section className="flex-1 overflow-y-auto bg-stone-50/40">
                    <div className="max-w-7xl mx-auto p-16">
                        <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 ease-out">
                            {children}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}