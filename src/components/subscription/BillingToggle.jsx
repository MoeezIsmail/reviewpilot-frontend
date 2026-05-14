import { Flame } from "lucide-react";
import { LIFETIME_SPOTS_LEFT } from "../../constants/subscriptionMeta.js";

const PERIODS = [
    { value: "monthly",  label: "Monthly" },
    { value: "yearly",   label: "Yearly"  },
    {
        value: "lifetime",
        label: "Lifetime",
        badge: `${LIFETIME_SPOTS_LEFT} spots left`,
        badgeClass: "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400",
        Icon: Flame,
    },
];

const DoodleArrow = () => (
    <span className="absolute -top-9 left-1/2 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none whitespace-nowrap">
        <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 italic">3 months free</span>
        <svg width="16" height="13" viewBox="0 0 16 13" fill="none" className="text-emerald-500 dark:text-emerald-400 mt-0.5">
            <path d="M8 1 C 6 4, 4 7, 3 12" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
            <path d="M3 12 L 7 10 M 3 12 L 2 8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
    </span>
);

const BillingToggle = ({ billingPeriod, setBillingPeriod }) => (
    <div className="flex items-center justify-center">
        <div className="pt-9">
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-2xl">
                {PERIODS.map(({ value, label, badge, badgeClass, Icon }) => (
                    <button
                        key={value}
                        onClick={() => setBillingPeriod(value)}
                        className={`
                            relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                            ${billingPeriod === value
                                ? "bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-gray-100 font-bold border !border-indigo-600"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200"}
                        `}
                    >
                        {value === "yearly" && <DoodleArrow />}
                        {label}
                        {badge && (
                            <span className={`flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full ${badgeClass}`}>
                                {Icon && <Icon size={10} />}
                                {badge}
                            </span>
                        )}
                    </button>
                ))}
            </div>
        </div>
    </div>
);

export default BillingToggle;
