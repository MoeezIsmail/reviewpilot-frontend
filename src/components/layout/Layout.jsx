import { useState } from "react";
import { Outlet, useLocation, Link } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";
import usePlanFeatures from "../../hooks/usePlanFeatures.js";
import { AlertTriangle } from "lucide-react";

const PAGE_TITLES = {
    "/":             "Dashboard",
    "/reviews":      "Reviews",
    "/analytics":    "Analytics",
    "/settings":     "Settings",
    "/subscription": "Subscription",
};

const Layout = () => {
    const { pathname } = useLocation();
    const activePage = PAGE_TITLES[pathname] ?? "Dashboard";
    const { isExpired, rawPlan, status } = usePlanFeatures();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const showExpiredBanner = (isExpired || status === "expired") && rawPlan !== "starter" && pathname !== "/subscription";

    return (
        <div className="flex h-screen w-screen bg-gray-50 dark:bg-gray-900 overflow-hidden">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
                <Navbar pageTitle={activePage} onMenuClick={() => setSidebarOpen(true)} />

                {showExpiredBanner && (
                    <div className="flex items-center justify-between gap-3 bg-red-50 dark:bg-red-950/40 border-b border-red-200 dark:border-red-900 px-5 py-2.5 text-sm text-red-700 dark:text-red-400 shrink-0">
                        <div className="flex items-center gap-2">
                            <AlertTriangle size={14} className="shrink-0" />
                            <span>Your subscription has expired. Some features are now restricted.</span>
                        </div>
                        <Link
                            to="/subscription"
                            className="shrink-0 text-xs font-semibold bg-red-600 text-white px-3 py-1.5 rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Renew Now
                        </Link>
                    </div>
                )}

                <main className="subscription-scroll flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
