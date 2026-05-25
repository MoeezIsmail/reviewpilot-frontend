import { Flame } from "lucide-react";

const buildPeriods = (lifetimeSpotsLeft) => [
    { value: "monthly",  label: "Monthly" },
    { value: "yearly",   label: "Yearly"  },
    // {
    //     value: "lifetime",
    //     label: "Lifetime",
    //     badge: `${lifetimeSpotsLeft ?? LIFETIME_SPOTS_LEFT} spots left`,
    //     badgeClass: "bg-orange-100 dark:bg-orange-900/40 text-orange-600 dark:text-orange-400",
    //     Icon: Flame,
    // },
];

const DoodleArrow = () => (
    <span className="absolute -top-14 left-3/5 -translate-x-1/2 flex flex-col items-center pointer-events-none select-none whitespace-nowrap">
        <span className="-rotate-3 inline-block text-[11px] font-extrabold text-white bg-gradient-to-r from-orange-400 to-rose-500 px-3 py-1 rounded-full shadow-lg shadow-orange-300/60 dark:shadow-orange-900/50 tracking-wide uppercase">
            3 months free
        </span>
        <svg
            width="30" height="30" viewBox="0 0 30 24" fill="none"
            className="text-orange-400 dark:text-orange-400 -mt-0.5 -ml-4"
        >
            <path
                d="M17 1 C 15 5, 12 10, 9 17 C 8.2 19.5 7.5 21.5 6 23"
                stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" fill="none"
            />
            <path d="M6 23 L 12 19.5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
            <path d="M6 23 L 7.5 17.5" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" />
        </svg>
    </span>
);

const BillingToggle = ({ billingPeriod, setBillingPeriod, lifetimeSpotsLeft }) => {
    const PERIODS = buildPeriods(lifetimeSpotsLeft);
    return (
    <div className="flex items-center justify-center">
        <div className="pt-14">
            <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 p-1 rounded-2xl">
                {PERIODS.map(({ value, label, badge, badgeClass, Icon }) => (
                    <button
                        key={value}
                        onClick={() => setBillingPeriod(value)}
                        className={`
                            relative flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200
                            ${billingPeriod === value
                                ? "bg-white dark:bg-gray-800 shadow-sm text-gray-900 dark:text-gray-100 font-bold border !border-indigo-600"
                                : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"}
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
};

export default BillingToggle;
