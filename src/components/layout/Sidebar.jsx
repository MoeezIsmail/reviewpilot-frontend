import { LayoutDashboard, Star, BarChart3, Settings, CreditCard, LogOut, X, UserCircle, Zap } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext.jsx";
import usePlanFeatures from "../../hooks/usePlanFeatures.js";

const nav = [
    { name: "Dashboard",    icon: LayoutDashboard, path: "/" },
    { name: "Reviews",      icon: Star,            path: "/reviews" },
    { name: "Analytics",    icon: BarChart3,        path: "/analytics" },
    { name: "Settings",     icon: Settings,         path: "/settings" },
    { name: "Subscription", icon: CreditCard,       path: "/subscription" },
];

const Sidebar = ({ isOpen, onClose }) => {
    const { signOut, user } = useAuth();
    const location = useLocation();
    const { plan, remainingAiReplies, limits } = usePlanFeatures();

    const aiLimit = limits?.aiRepliesPerMonth ?? 10;
    const aiUsed = user?.subscription?.aiRepliesUsed ?? 0;
    const isUnlimited = aiLimit === -1;
    const usagePct = isUnlimited ? 100 : Math.min(100, Math.round((aiUsed / aiLimit) * 100));
    const barColor = usagePct >= 90 ? "bg-rose-500" : usagePct >= 70 ? "bg-amber-500" : "bg-indigo-500";

    const handleSignOut = () => {
        onClose?.();
        signOut();
    };

    const SidebarContent = () => (
        <aside className="flex flex-col h-full w-64 bg-gradient-to-b from-white to-indigo-50/60 dark:from-gray-900 dark:to-gray-900">

            {/* Logo row */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-sm shadow-md shadow-indigo-300/40 dark:shadow-indigo-900/40">
                        RP
                    </div>
                    <span className="font-bold text-base text-indigo-700 dark:text-indigo-300 tracking-tight">
                        ReviewPilot
                    </span>
                </div>
                {/* Close button — mobile only */}
                <button
                    onClick={onClose}
                    className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Close menu"
                >
                    <X size={16} />
                </button>
            </div>

            {/* Nav links */}
            <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                {nav.map((item) => {
                    const Icon = item.icon;
                    const isActive = location.pathname === item.path;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            end
                            onClick={() => onClose?.()}
                            className={`
                                group relative flex items-center gap-3 px-3 py-2.5 rounded-xl
                                transition-all duration-200 text-sm font-medium
                                ${isActive
                                    ? "bg-white dark:bg-gray-800 shadow-md shadow-indigo-100 dark:shadow-none text-indigo-700 dark:text-indigo-300"
                                    : "text-gray-600 dark:text-gray-400 hover:bg-white/70 dark:hover:bg-gray-800/60 hover:text-gray-900 dark:hover:text-gray-200"
                                }
                            `}
                        >
                            {/* Active accent */}
                            {isActive && (
                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-600 rounded-r-full" />
                            )}
                            <Icon
                                size={17}
                                className={`shrink-0 transition-transform duration-200 ${isActive ? "text-indigo-600 dark:text-indigo-400" : "group-hover:scale-110"}`}
                            />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            {/* AI usage pill */}
            {!isUnlimited && (
                <div className="mx-3 mb-3 px-3 py-3 rounded-xl bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-1.5">
                            <Zap size={12} className="text-indigo-500" />
                            <span className="text-xs font-medium text-gray-600 dark:text-gray-300">AI Replies</span>
                        </div>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {aiUsed}/{aiLimit}
                        </span>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-1.5">
                        <div
                            className={`${barColor} h-1.5 rounded-full transition-all duration-500`}
                            style={{ width: `${usagePct}%` }}
                        />
                    </div>
                    {usagePct >= 90 && (
                        <p className="text-[10px] text-rose-500 mt-1.5">
                            Running low — upgrade for more
                        </p>
                    )}
                </div>
            )}

            {/* Footer: user + sign out */}
            <div className="p-3 border-t border-gray-100 dark:border-gray-700 space-y-2">
                {/* User info */}
                <div className="flex items-center gap-2.5 px-2 py-1.5">
                    {user?.profileImage ? (
                        <img
                            src={user.profileImage}
                            className="w-7 h-7 rounded-full object-cover shrink-0"
                            alt={user?.name}
                        />
                    ) : (
                        <div className="w-7 h-7 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center shrink-0">
                            <UserCircle size={15} className="text-indigo-500" />
                        </div>
                    )}
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-800 dark:text-gray-200 truncate">{user?.name}</p>
                        <p className="text-[10px] text-gray-400 dark:text-gray-500 truncate capitalize">{plan} plan</p>
                    </div>
                </div>

                {/* Sign out */}
                <button
                    onClick={handleSignOut}
                    className="
                        w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium
                        text-red-500 bg-red-50 dark:bg-red-950/30
                        hover:bg-red-100 dark:hover:bg-red-900/40 transition-colors
                    "
                >
                    <LogOut size={16} />
                    <span>Sign Out</span>
                </button>
            </div>
        </aside>
    );

    return (
        <>
            {/* Desktop sidebar */}
            <div className="hidden lg:flex h-screen w-64 border-r border-gray-200 dark:border-gray-700 shrink-0">
                <SidebarContent />
            </div>

            {/* Mobile overlay */}
            {isOpen && (
                <div className="lg:hidden fixed inset-0 z-50 flex">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    {/* Drawer */}
                    <div className="relative w-64 h-full shadow-2xl animate-in slide-in-from-left duration-200">
                        <SidebarContent />
                    </div>
                </div>
            )}
        </>
    );
};

export default Sidebar;
