import { Sun, Moon, Check } from "lucide-react";
import { useTheme } from "../../context/ThemeContext.jsx";

const LightPreview = () => (
    <div className="w-full rounded-lg overflow-hidden border border-gray-200" style={{ height: 72 }}>
        <div className="flex h-full">
            <div className="w-10 bg-gray-100 flex flex-col items-center gap-1 pt-2">
                <div className="w-5 h-1.5 bg-indigo-500 rounded-sm" />
                <div className="w-5 h-1.5 bg-gray-300 rounded-sm" />
                <div className="w-5 h-1.5 bg-gray-300 rounded-sm" />
            </div>
            <div className="flex-1 bg-white p-2 space-y-1.5">
                <div className="flex gap-1">
                    <div className="h-2 bg-gray-200 rounded w-12" />
                    <div className="h-2 bg-indigo-100 rounded w-8" />
                </div>
                <div className="h-1.5 bg-gray-100 rounded w-full" />
                <div className="h-1.5 bg-gray-100 rounded w-4/5" />
                <div className="h-4 bg-indigo-500 rounded w-12 mt-1" />
            </div>
        </div>
    </div>
);

const DarkPreview = () => (
    <div className="w-full rounded-lg overflow-hidden border border-gray-700" style={{ height: 72 }}>
        <div className="flex h-full">
            <div className="w-10 bg-gray-900 flex flex-col items-center gap-1 pt-2">
                <div className="w-5 h-1.5 bg-indigo-400 rounded-sm" />
                <div className="w-5 h-1.5 bg-gray-700 rounded-sm" />
                <div className="w-5 h-1.5 bg-gray-700 rounded-sm" />
            </div>
            <div className="flex-1 bg-gray-800 p-2 space-y-1.5">
                <div className="flex gap-1">
                    <div className="h-2 bg-gray-600 rounded w-12" />
                    <div className="h-2 bg-indigo-900 rounded w-8" />
                </div>
                <div className="h-1.5 bg-gray-700 rounded w-full" />
                <div className="h-1.5 bg-gray-700 rounded w-4/5" />
                <div className="h-4 bg-indigo-500 rounded w-12 mt-1" />
            </div>
        </div>
    </div>
);

const ThemeCard = () => {
    const { theme, setTheme } = useTheme();

    const options = [
        { value: "light", label: "Light mode",  icon: Sun,  Preview: LightPreview },
        { value: "dark",  label: "Dark mode",   icon: Moon, Preview: DarkPreview  },
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden h-full">
            <div className="flex items-center gap-2.5 px-6 py-4 border-b border-gray-100 dark:border-gray-700">
                <div className="w-8 h-8 bg-violet-50 dark:bg-violet-900/40 rounded-lg flex items-center justify-center">
                    <Sun size={16} className="text-violet-600 dark:text-violet-400" />
                </div>
                <div>
                    <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">Appearance</h2>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Choose your preferred theme</p>
                </div>
            </div>

            <div className="px-6 py-5">
                <div className="grid grid-cols-2 gap-3">
                    {options.map(({ value, label, icon: Icon, Preview }) => {
                        const isSelected = theme === value;
                        return (
                            <button
                                key={value}
                                onClick={() => setTheme(value)}
                                className={`relative flex flex-col gap-3 p-3 rounded-xl border-2 transition-all duration-200 text-left ${
                                    isSelected
                                        ? "border-indigo-500 bg-indigo-50 dark:bg-indigo-900/20"
                                        : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-indigo-200 dark:hover:border-indigo-700"
                                }`}
                            >
                                {isSelected && (
                                    <span className="absolute top-2 right-2 w-5 h-5 bg-indigo-600 rounded-full flex items-center justify-center">
                                        <Check size={11} strokeWidth={3} className="text-white" />
                                    </span>
                                )}
                                <Preview />
                                <div className="flex items-center gap-2">
                                    <Icon size={14} className={isSelected ? "text-indigo-600 dark:text-indigo-400" : "text-gray-400 dark:text-gray-500"} />
                                    <span className={`text-sm font-medium ${
                                        isSelected ? "text-indigo-700 dark:text-indigo-300" : "text-gray-600 dark:text-gray-400"
                                    }`}>
                                        {label}
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ThemeCard;
