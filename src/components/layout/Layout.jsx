import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import Navbar from "./Navbar.jsx";

const Layout = () => {
    const [activePage, setActivePage] = useState("Dashboard");

    return (
        <div className="flex h-screen w-screen bg-gray-100">
            <Sidebar setActivePage={setActivePage} />

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
