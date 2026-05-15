import { Sun, Moon, Palette } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const ThemeCard = () => {
    const { theme, setTheme } = useTheme();

    const options = [
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            {/* Header */}
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="w-8 h-8 bg-indigo-50 dark:bg-indigo-900/40 rounded-lg flex items-center justify-center">
                    <Palette size={16} className="text-indigo-600 dark:text-indigo-400" />
                </div>
                <div>
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">Appearance</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
                </div>
            </div>

            {/* Body */}
            <div className="px-6 py-5">
                <div className="flex gap-3">
                    {options.map(({ value, label, icon: Icon }) => {
                        const isSelected = theme === value;
                        return (
                            <button
                                key={value}
                                onClick={() => setTheme(value)}
                                className={`flex-1 flex flex-col items-center gap-3 py-5 rounded-xl border-2 transition-all duration-200 ${
                                    isSelected
                                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/30"
                                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-indigo-50/40 dark:hover:bg-indigo-900/20"
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                                    isSelected
                                        ? "bg-indigo-600 text-white"
                                        : "bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
                                }`}>
                                    <Icon size={20} />
                                </div>
                                <span className={`text-sm font-medium ${
                                    isSelected
                                        ? "text-indigo-700 dark:text-indigo-300"
                                        : "text-gray-600 dark:text-gray-400"
                                }`}>
                                    {label}
                                </span>
                                {isSelected && (
                                    <span className="text-xs text-indigo-500 dark:text-indigo-400 font-semibold">Active</span>
                                )}
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ThemeCard;
