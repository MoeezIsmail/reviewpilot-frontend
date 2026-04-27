import { LayoutDashboard, Star, BarChart3, Settings } from "lucide-react"
import { NavLink } from "react-router-dom"

const Sidebar = ({ setActivePage }) => {

    const nav = [
        { name: "Dashboard", icon: LayoutDashboard, path: "/" },
        { name: "Reviews", icon: Star, path: "/reviews" },
        // { name: "Records", icon: Star, path: "/" },
        { name: "Analytics", icon: BarChart3, path: "/analytics" },
        { name: "Settings", icon: Settings, path: "/settings" }
    ]

    return (
        <aside className="w-64 bg-white shadow-md border-r border-gray-300 h-screen">

            <div className="flex p-6 items-center gap-2">
                <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                    RP
                </div>

                <div className="font-bold text-xl text-indigo-600">
                    ReviewPilot
                </div>
            </div>

            <nav className="px-4 space-y-2">

                {nav.map((item, i) => {

                    const Icon = item.icon

                    return (
                        <NavLink
                            key={i}
                            to={item.path}
                            end
                            className={({ isActive }) =>
                                `flex items-center gap-3 p-3 rounded-lg transition font-medium
                ${
                                    isActive
                                        ? "bg-indigo-600 !text-white"
                                        : "!text-gray-700 hover:bg-indigo-100"
                                }`
                            }
                            onClick={() => setActivePage(item.name)}
                        >
                            <Icon size={18} />
                            <span>{item.name}</span>
                        </NavLink>
                    )
                })}

            </nav>
            

        </aside>
    )
}

export default Sidebar