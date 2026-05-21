import { Bell, UserCircle, Menu } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";

const Navbar = ({ pageTitle, onMenuClick }) => {
    const { user } = useAuth();
    const [imgError, setImgError] = useState(false);

    return (
        <header className="shrink-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 md:px-6 py-3 flex items-center justify-between gap-3 shadow-sm">

            {/* Left: hamburger (mobile) + page title */}
            <div className="flex items-center gap-3 min-w-0">
                <button
                    onClick={onMenuClick}
                    className="lg:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Toggle menu"
                >
                    <Menu size={20} />
                </button>
                <div className="min-w-0">
                    <h1 className="text-lg font-bold text-gray-900 dark:text-gray-100 truncate">
                        {pageTitle || "Dashboard"}
                    </h1>
                </div>
            </div>

            {/* Right: bell + user */}
            <div className="flex items-center gap-3 shrink-0">
                <button
                    className="relative p-2 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-200 dark:hover:bg-gray-700 transition-colors"
                    aria-label="Notifications"
                >
                    <Bell size={18} />
                </button>

                <div className="flex items-center gap-2.5">
                    {user?.profileImage && !imgError ? (
                        <img
                            src={user.profileImage}
                            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-100 dark:ring-indigo-900"
                            onError={() => setImgError(true)}
                            alt={user?.name || "User"}
                        />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/50 flex items-center justify-center">
                            <UserCircle size={18} className="text-indigo-500 dark:text-indigo-400" />
                        </div>
                    )}
                    <div className="hidden sm:flex flex-col leading-tight">
                        <span className="text-sm font-semibold text-gray-800 dark:text-gray-200 truncate max-w-[120px]">
                            {user?.name || "User"}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                            {user?.subscription?.plan
                                ? user.subscription.plan.charAt(0).toUpperCase() + user.subscription.plan.slice(1)
                                : "Free"} plan
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
