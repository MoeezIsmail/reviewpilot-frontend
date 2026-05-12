import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

const PAGE_TITLES = {
    "/": "Dashboard",
    "/reviews": "Reviews",
    "/analytics": "Analytics",
    "/settings": "Settings",
    "/subscription": "Subscription",
};

const Layout = () => {
    const { pathname } = useLocation();
    const activePage = PAGE_TITLES[pathname] ?? "Dashboard";

    return (
        <div className="flex h-screen w-screen bg-gray-100">
            <Sidebar />

            <div className="flex flex-col flex-1">
                <Navbar pageTitle={activePage} />

                <main className="p-4 overflow-y-auto bg-gray-100 h-screen">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default Layout;
