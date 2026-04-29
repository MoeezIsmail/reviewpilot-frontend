import { LayoutDashboard, Star, BarChart3, Settings, LogOut } from "lucide-react"
import { NavLink, useLocation } from "react-router-dom"
import { useAuth } from "../context/AuthContext.jsx"

const Sidebar = ({ setActivePage }) => {
    const { signOut } = useAuth()
    const location = useLocation()

    const nav = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/" },
        { name: "Reviews", icon: Star, path: "/reviews" },
        { name: "Analytics", icon: BarChart3, path: "/analytics" },
        { name: "Settings", icon: Settings, path: "/settings" }
    ]

    return (
        <aside className="w-64 h-screen flex flex-col bg-gradient-to-b from-white to-indigo-100 border-r border-gray-200">

            {/* Logo */}
            <div className="flex p-6 items-center gap-3 border-b border-gray-100">
                <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-200">
                    RP
                </div>
                <div className="font-semibold text-lg text-indigo-600 tracking-wide">
                    ReviewPilot
                </div>
            </div>

            {/* Nav */}
            <nav className="flex-1 px-3 py-5 space-y-2">

                {nav.map((item, i) => {
                    const Icon = item.icon
                    const isActive = location.pathname === item.path

                    return (
                        <NavLink
                            key={i}
                            to={item.path}
                            end
                            onClick={() => setActivePage(item.name)}
                            className={`
                                group relative flex items-center gap-3 px-4 py-3 rounded-xl
                                transition-all duration-300 ease-out
                                
                                ${isActive
                                ? "!bg-white shadow-lg shadow-indigo-200 scale-[1.02]"
                                : "!text-gray-600 hover:!bg-white hover:!shadow-md hover:scale-[1.01]"
                            }
                            `}
                        >
                            {/* Glow Layer */}
                            {isActive && (
                                <div className="absolute inset-0 rounded-xl bg-indigo-600 blur-md opacity-10 -z-10"></div>
                            )}

                            {/* Left Accent Line */}
                            <div className={`
                                absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 rounded-r-full
                                transition-all duration-300
                                ${isActive ? "bg-indigo-400 opacity-100" : "opacity-0 group-hover:opacity-40 bg-indigo-600"}
                            `} />

                            {/* Icon */}
                            <Icon
                                size={18}
                                className={`
                                    transition-all duration-300
                                    ${isActive ? "scale-110" : "group-hover:scale-110"}
                                `}
                            />

                            {/* Text */}
                            <span className="font-medium tracking-tight">
                                {item.name}
                            </span>
                        </NavLink>
                    )
                })}
            </nav>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100">
                <button
                    onClick={signOut}
                    className="
                        w-full flex items-center gap-3 px-4 py-3 rounded-xl
                        text-red-500 transition-all duration-300
                        hover:bg-white hover:shadow-md hover:scale-[1.01]
                        active:scale-[0.98] hover:!border-red-500 !bg-red-50
                    "
                >
                    <LogOut size={18} className="transition group-hover:rotate-6" />
                    <span className="font-medium">Sign Out</span>
                </button>
            </div>

        </aside>
    )
}

export default Sidebar