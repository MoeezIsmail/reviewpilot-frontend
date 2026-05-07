import {Bell} from "lucide-react";
import {useAuth} from "../../context/AuthContext.jsx";

const Navbar = ({pageTitle}) => {
    const {user} = useAuth();

    return (
        <header className={`p-2`}>
            <div className="flex items-center justify-between bg-indigo-600 !text-white px-6 py-4 border-b border-gray-300 rounded-lg">
                <h1 className="text-lg font-semibold">
                    {pageTitle || "Dashboard"}
                </h1>

                <div className="flex items-center gap-6">
                    <div className="border-r px-6 py-2">
                        <Bell className="cursor-pointer"/>
                    </div>

                    <div className="flex items-center gap-4">
                        <img
                            src="https://i.pravatar.cc/40"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="flex flex-col font-bold">
                            <span>{user?.name}</span>
                            <span className="text-xs">Admin</span>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
