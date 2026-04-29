import { LayoutDashboard, Star, BarChart3, Settings, LogOut } from "lucide-react"
import { NavLink } from "react-router-dom"

const Sidebar = ({ setActivePage, onSignOut }) => {

    const nav = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/" },
        { name: "Reviews", icon: Star, path: "/reviews" },
        { name: "Analytics", icon: BarChart3, path: "/analytics" },
        { name: "Settings", icon: Settings, path: "/settings" }
    ]

    return (
        <aside className="w-64 h-screen flex flex-col bg-gradient-to-b from-white to-indigo-50 border-r border-gray-200 shadow-sm">

            {/* Logo */}
            <div className="flex p-6 items-center gap-3 border-b">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-md">
                    RP
                </div>
                <div className="font-bold text-xl text-indigo-600 tracking-wide">
                    ReviewPilot
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-4 space-y-2">

                {nav.map((item, i) => {
                    const Icon = item.icon

                    return (
                        <NavLink
                            key={i}
                            to={item.path}
                            end
                            className={({ isActive }) =>
                                `group flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 relative
                                
                                ${isActive
                                    ? "bg-indigo-600 text-white shadow-md"
                                    : "text-gray-600 hover:bg-indigo-100"
                                }`
                            }
                            onClick={() => setActivePage(item.name)}
                        >
                            {/* Active Indicator */}
                            <span className={`absolute left-0 top-0 h-full w-1 rounded-r-full 
                                ${location.pathname === item.path ? "bg-white" : "bg-transparent"}`} />

                            <Icon size={18} className="group-hover:scale-110 transition" />
                            <span className="font-medium">{item.name}</span>
                        </NavLink>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t">
                <button
                    onClick={onSignOut}
                    className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-100 transition"
                >
                    <LogOut size={18} />
                    <span className="font-medium !text-red-400 hover:!text-red-600">Sign Out</span>
                </button>
            </div>

        </aside>
    )
}

export default Sidebar